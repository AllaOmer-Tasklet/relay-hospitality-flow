import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, MessageSquare, Phone, Zap, CalendarCheck, MessageCircle, Check } from "lucide-react";
import taskletIcon from "@/assets/tasklet-icon.png";

const RECOVERY_BASE_RATE = 0.7; // 70% of missed leads
const WEBHOOK_URL = "https://webhook.tasklet.uk/audit";

function formatGBP(n: number) {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

/* Smoothly count up/down to a target value */
function useAnimatedNumber(target: number, duration = 280) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    fromRef.current = value;
    startRef.current = null;
    const from = fromRef.current;
    const to = target;
    if (from === to) return;

    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (to - from) * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return value;
}

const Index = () => {
  const [enquiries, setEnquiries] = useState(100);
  const [enquiryValue, setEnquiryValue] = useState(300);
  const [delayHours, setDelayHours] = useState(4);
  const [followUpRate, setFollowUpRate] = useState(20); // %
  const [missRate, setMissRate] = useState(35); // %

  const splitRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  /* Calculations */
  const calc = useMemo(() => {
    const ignored = Math.round(enquiries * (missRate / 100));
    const responded = enquiries - ignored;
    // delayed = responded leads where delay > 1 hour, scaled by delay severity
    const delayedShare = Math.min(1, Math.max(0, (delayHours - 0.0833) / 24));
    const delayed = Math.round(responded * delayedShare);
    const lostOpportunities = ignored + Math.round(delayed * 0.6);
    const revenueLost = lostOpportunities * enquiryValue;

    // Recovery: 70% of missed (ignored) leads recovered, reduced by delay penalty
    // delay penalty: 3% per hour reduction, capped at 60%
    const delayPenalty = Math.min(0.6, delayHours * 0.03);
    const effectiveRecovery = Math.max(0, RECOVERY_BASE_RATE - delayPenalty);
    // Improvement over current follow-up rate
    const currentRecovered = ignored * (followUpRate / 100);
    const newRecovered = ignored * effectiveRecovery;
    const opportunitiesRecovered = Math.max(0, Math.round(newRecovered - currentRecovered));
    const enquiriesCaptured = enquiries - Math.max(0, ignored - opportunitiesRecovered);
    const recoveredRevenue = opportunitiesRecovered * enquiryValue;

    return {
      ignored,
      delayed,
      lostOpportunities,
      revenueLost,
      enquiriesCaptured,
      opportunitiesRecovered,
      recoveredRevenue,
    };
  }, [enquiries, enquiryValue, delayHours, followUpRate, missRate]);

  const aIgnored = useAnimatedNumber(calc.ignored);
  const aDelayed = useAnimatedNumber(calc.delayed);
  const aLost = useAnimatedNumber(calc.lostOpportunities);
  const aRevLost = useAnimatedNumber(calc.revenueLost);
  const aCaptured = useAnimatedNumber(calc.enquiriesCaptured);
  const aRecovered = useAnimatedNumber(calc.opportunitiesRecovered);
  const aRevRec = useAnimatedNumber(calc.recoveredRevenue);
  const aEnquiries = useAnimatedNumber(enquiries);

  const lossLine = useMemo(() => {
    if (calc.revenueLost < 5000) return "Small leaks add up fast.";
    if (calc.revenueLost <= 15000) return "This is likely costing you deals every week.";
    return "At this level, this isn't a leak. It's a system failure.";
  }, [calc.revenueLost]);

  /* Form */
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [formEnquiries, setFormEnquiries] = useState<number>(100);

  useEffect(() => {
    setFormEnquiries(enquiries);
  }, [enquiries]);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !businessName.trim() || !email.trim() || !businessType.trim()) {
      toast.error("Please fill in every field.");
      return;
    }
    setSubmitting(true);

    const payload = {
      name: name.trim(),
      businessName: businessName.trim(),
      email: email.trim(),
      monthlyEnquiries: Number(formEnquiries) || 0,
      businessType: businessType.trim(),
      estimatedLoss: Math.round(calc.revenueLost),
      source: "tasklet.uk audit",
    };

    // Fire both in parallel: webhook + notification email
    const webhookPromise = fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((err) => {
      console.warn("Webhook POST failed:", err);
      return null;
    });

    const emailPromise = supabase.functions.invoke("send-notification", {
      body: {
        type: "audit_request",
        name: payload.name,
        businessName: payload.businessName,
        email: payload.email,
        businessType: payload.businessType,
        monthlyEnquiries: payload.monthlyEnquiries,
        estimatedLoss: payload.estimatedLoss,
      },
    });

    const [, emailRes] = await Promise.all([webhookPromise, emailPromise]);

    setSubmitting(false);

    if (emailRes.error) {
      console.error("Notification error:", emailRes.error);
      toast.error("Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="absolute top-0 left-0 right-0 z-20">
        <div className="container flex items-center justify-between py-6">
          <a href="/" className="flex items-center gap-[8px]" aria-label="Tasklet home">
            <img src={taskletIcon} alt="" className="h-6 w-auto" />
            <span className="text-[18px] font-bold leading-none text-foreground">Tasklet</span>
          </a>
          <button
            onClick={() => scrollTo(ctaRef)}
            className="text-sm font-medium text-gold hover:text-gold-soft transition-colors"
          >
            Book a call
          </button>
        </div>
      </header>

      {/* SECTION 1 — Hero */}
      <section className="relative min-h-screen flex flex-col justify-center">
        <div className="container max-w-3xl mx-auto text-center pt-28 pb-16">
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-balance mb-6">
            How much is your business losing from missed enquiries?
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-3 text-balance">
            Most businesses think they respond fast. The data says otherwise.
          </p>
          <p className="text-sm md:text-base text-muted-foreground mb-12 text-balance">
            Most businesses lose 20–40% of leads without ever knowing. Find out your number.
          </p>

          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              How many enquiries does your business receive per month?
            </p>

            <div className="relative">
              <Slider
                value={[enquiries]}
                onValueChange={(v) => setEnquiries(v[0])}
                min={10}
                max={1000}
                step={5}
                className="max-w-xl mx-auto"
              />
              {/* Drifting icons */}
              <div className="pointer-events-none absolute inset-0 -mx-6 hidden md:block">
                <Phone className="absolute -top-6 left-2 h-4 w-4 text-muted-foreground/40 animate-fade-in" />
                <Mail className="absolute -bottom-7 left-1/3 h-4 w-4 text-muted-foreground/40 animate-fade-in" />
                <MessageCircle className="absolute -top-6 right-6 h-4 w-4 text-muted-foreground/40 animate-fade-in" />
              </div>
            </div>

            <div className="text-5xl md:text-6xl font-bold text-gold num-tabular">
              {Math.round(aEnquiries).toLocaleString("en-GB")}
            </div>

            <button
              onClick={() => scrollTo(splitRef)}
              className="inline-flex items-center justify-center rounded-md bg-gold text-accent-foreground font-semibold px-7 py-3.5 text-base hover:brightness-110 transition-all"
            >
              Calculate my lost revenue
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Split */}
      <section ref={splitRef} className="border-t border-border">
        <div className="grid md:grid-cols-2">
          {/* Loss */}
          <div className="bg-loss-tint p-8 md:p-14 border-b md:border-b-0 md:border-r border-border">
            <p className="text-xs uppercase tracking-widest text-loss-label mb-8">
              What usually happens
            </p>

            <div className="flex gap-3 mb-10 opacity-60">
              <Mail className="h-5 w-5" />
              <MessageSquare className="h-5 w-5" />
              <Phone className="h-5 w-5" />
            </div>

            <dl className="space-y-5">
              <Stat label="Enquiries ignored" value={Math.round(aIgnored).toLocaleString("en-GB")} />
              <Stat label="Enquiries delayed" value={Math.round(aDelayed).toLocaleString("en-GB")} />
              <Stat label="Lost opportunities" value={Math.round(aLost).toLocaleString("en-GB")} />
            </dl>

            <div className="mt-10">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Estimated revenue lost
              </p>
              <p className="text-4xl md:text-5xl font-bold text-gold num-tabular">
                {formatGBP(aRevLost)}
              </p>
              <p className="mt-3 text-sm text-foreground/70">{lossLine}</p>
              <p className="mt-6 text-xs text-muted-foreground">
                Based on response time, follow-up rate, and industry averages.
              </p>
            </div>
          </div>

          {/* Gain */}
          <div className="bg-gain-tint p-8 md:p-14">
            <p className="text-xs uppercase tracking-widest text-gain-label mb-8">
              What happens with proper follow-up
            </p>

            <div className="flex gap-3 mb-10">
              <span className="inline-flex items-center gap-1 text-sm text-gain-label">
                <Mail className="h-5 w-5" /> <Check className="h-3.5 w-3.5" />
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-gain-label">
                <MessageSquare className="h-5 w-5" /> <Check className="h-3.5 w-3.5" />
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-gain-label">
                <Phone className="h-5 w-5" /> <Check className="h-3.5 w-3.5" />
              </span>
            </div>

            <dl className="space-y-5">
              <Stat
                label="Enquiries captured"
                value={Math.round(aCaptured).toLocaleString("en-GB")}
              />
              <Stat
                label="Opportunities recovered"
                value={Math.round(aRecovered).toLocaleString("en-GB")}
              />
            </dl>

            <div className="mt-10">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Recovered revenue
              </p>
              <p className="text-4xl md:text-5xl font-bold text-gold num-tabular">
                {formatGBP(aRevRec)}
              </p>
              <p className="mt-6 text-xs text-muted-foreground">
                Based on your inputs and typical conversion rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Control sliders */}
      <section className="border-t border-border">
        <div className="container max-w-3xl py-16 md:py-20 space-y-12">
          <Control
            label="Average value of a won enquiry"
            subtext="Used to calculate the revenue figures above."
            value={enquiryValue}
            onChange={setEnquiryValue}
            min={50}
            max={10000}
            step={50}
            display={formatGBP(enquiryValue)}
            quiet="e.g. £150 restaurant booking · £3,000 wedding · £5,000 property sale."
          />
          <Control
            label="Response delay"
            subtext="How long before your team typically replies to a new enquiry?"
            value={delayHours}
            onChange={setDelayHours}
            min={0}
            max={24}
            step={0.25}
            display={delayHours < 1 ? `${Math.round(delayHours * 60)} min` : `${delayHours} hr`}
            quiet="Enquiries go cold after ~5 minutes."
          />
          <Control
            label="Current follow-up rate"
            subtext="What percentage of enquiries does your team actively follow up on?"
            value={followUpRate}
            onChange={setFollowUpRate}
            min={0}
            max={100}
            step={1}
            display={`${followUpRate}%`}
          />
          <Control
            label="Enquiry miss rate"
            subtext="How many enquiries slip through without a response?"
            value={missRate}
            onChange={setMissRate}
            min={5}
            max={60}
            step={1}
            display={`${missRate}%`}
          />
          <p className="text-xs text-muted-foreground text-center pt-2">
            Based on typical response and conversion patterns across service businesses.
          </p>
        </div>
      </section>

      {/* SECTION 4 — Reframe */}
      <section className="py-28 md:py-36">
        <div className="container max-w-3xl text-center">
          <p className="text-2xl md:text-3xl font-medium text-foreground text-balance">
            This isn't a marketing problem. It's a response problem.
          </p>
        </div>
      </section>

      {/* SECTION 5 — Social proof strip */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container py-10 text-center">
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto text-balance">
            Systems running across multiple service businesses — capturing and following up with
            every enquiry, around the clock.
          </p>
        </div>
      </section>

      {/* SECTION 6 — How it works */}
      <section className="py-24">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-3 gap-12">
            <Step
              icon={<MessageSquare className="h-6 w-6" />}
              title="Enquiry comes in"
              body="Website form, phone call, Facebook message, Instagram DM. Every channel. Nothing missed."
            />
            <Step
              icon={<Zap className="h-6 w-6" />}
              title="Response sent instantly"
              body="The enquirer hears back within seconds. Day or night. No staff involvement required."
            />
            <Step
              icon={<CalendarCheck className="h-6 w-6" />}
              title="Follow-up runs itself"
              body="If they don't book, follow-up continues on schedule until they respond or they're marked lost."
            />
          </div>
        </div>
      </section>

      {/* SECTION 7 — CTA */}
      <section ref={ctaRef} className="py-24 md:py-32 border-t border-border">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Let's map where your enquiries are leaking.
          </h2>
          <p className="text-lg text-foreground/80 mb-2 text-balance">
            We'll show you exactly where revenue is being lost and how to recover it.
          </p>
          <p className="text-sm text-muted-foreground mb-10">No commitment. No cost.</p>

          {!formOpen && !submitted && (
            <button
              onClick={() => setFormOpen(true)}
              className="inline-flex items-center justify-center rounded-md bg-gold text-accent-foreground font-semibold px-8 py-4 text-base hover:brightness-110 transition-all w-full sm:w-auto"
            >
              Run my free audit
            </button>
          )}

          {formOpen && !submitted && (
            <form
              onSubmit={handleSubmit}
              className="mt-2 text-left space-y-4 max-w-md mx-auto animate-fade-in"
            >
              <Field
                label="Name"
                value={name}
                onChange={setName}
                placeholder="Your name"
                autoFocus
              />
              <Field
                label="Business name"
                value={businessName}
                onChange={setBusinessName}
                placeholder="e.g. The Grand Hotel, Smith & Co Estate Agents"
              />
              <Field
                label="Business email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="you@business.com"
              />
              <Field
                label="Monthly enquiries"
                type="number"
                value={String(formEnquiries)}
                onChange={(v) => setFormEnquiries(Number(v) || 0)}
              />
              <Field
                label="Business type"
                value={businessType}
                onChange={setBusinessType}
                placeholder="e.g. estate agent, restaurant, clinic"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center rounded-md bg-gold text-accent-foreground font-semibold px-6 py-3.5 hover:brightness-110 transition-all disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Send my audit request"}
              </button>
            </form>
          )}

          {submitted && (
            <p className="mt-4 text-foreground/90 animate-fade-in">
              We'll be in touch within 24 hours with your personalised audit. — Tasklet
            </p>
          )}
        </div>
      </section>

      {/* SECTION 8 — Closing */}
      <section className="py-32 md:py-40">
        <div className="container max-w-4xl text-center">
          <p className="text-3xl md:text-5xl font-bold text-gold leading-tight text-balance">
            Every hour of delay is revenue you won't get back.
          </p>
        </div>
      </section>

      {/* SECTION 9 — Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-xs text-muted-foreground">
          Tasklet © 2026 | contact@tasklet.uk | tasklet.uk
        </div>
      </footer>
    </div>
  );
};

/* ---------- helpers ---------- */

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-baseline justify-between border-b border-border/50 pb-3">
    <dt className="text-sm text-muted-foreground">{label}</dt>
    <dd className="text-2xl md:text-3xl font-semibold text-foreground num-tabular">{value}</dd>
  </div>
);

const Control = ({
  label,
  subtext,
  value,
  onChange,
  min,
  max,
  step,
  display,
  quiet,
}: {
  label: string;
  subtext: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  display: string;
  quiet?: string;
}) => (
  <div>
    <div className="flex items-baseline justify-between mb-1">
      <label className="text-base font-medium">{label}</label>
      <span className="text-gold font-semibold num-tabular">{display}</span>
    </div>
    <p className="text-sm text-muted-foreground mb-4">{subtext}</p>
    <Slider
      value={[value]}
      onValueChange={(v) => onChange(v[0])}
      min={min}
      max={max}
      step={step}
    />
    {quiet && <p className="mt-3 text-xs text-muted-foreground">{quiet}</p>}
  </div>
);

const Step = ({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) => (
  <div>
    <div className="text-gold mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
  </div>
);

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
}) => (
  <div>
    <label className="block text-sm text-muted-foreground mb-1.5">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
      className="w-full bg-secondary border border-border rounded-md px-3.5 py-2.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
    />
  </div>
);

export default Index;
