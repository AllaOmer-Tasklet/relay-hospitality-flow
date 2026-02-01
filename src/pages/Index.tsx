import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import Testimonials from "@/components/home/Testimonials";
import LiveDeployments from "@/components/home/LiveDeployments";
import { ArrowRight, Clock, MessageSquare, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground mb-6 animate-fade-up">
              <span className="flex h-2 w-2 rounded-full bg-accent"></span>
              Now available for hospitality venues
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Stop Missing Enquiries. Capture Bookings Automatically.
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              A done-for-you enquiry capture and follow-up system for independent hotels and event venues. No missed leads, no manual chasing.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/contact">
                <Button variant="cta" size="xl">
                  Book a Demo
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/relay">
                <Button variant="ctaOutline" size="xl">
                  Learn About Relay
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--amber)/0.1),transparent_50%)]"></div>
      </section>

      {/* Live Deployments - Social Proof */}
      <LiveDeployments />

      {/* Problem Section */}
      <section className="border-t border-border">
        <div className="container py-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              You're not losing enquiries to competitors
            </h2>
            <p className="text-lg text-muted-foreground">
              You're losing them to slow responses, missed emails, and follow-ups that never happen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-destructive/10 text-destructive mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Slow Response Times</h3>
              <p className="text-sm text-muted-foreground">
                Enquiries that wait more than an hour are 7x less likely to convert.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-destructive/10 text-destructive mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Scattered Channels</h3>
              <p className="text-sm text-muted-foreground">
                Emails, forms, calls — leads come from everywhere and get lost everywhere.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-destructive/10 text-destructive mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">No Follow-Up System</h3>
              <p className="text-sm text-muted-foreground">
                Busy teams forget to follow up. Interested guests move on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm mb-6">
              Introducing Relay
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Capture every enquiry. Follow up on every lead.
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Relay connects to your existing systems and handles the work your team doesn't have time for.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-6">
              <h3 className="font-semibold text-xl mb-3">Instant Acknowledgment</h3>
              <p className="text-primary-foreground/70">
                Every enquiry gets a response within minutes — not hours. Your guests feel heard while your team focuses on bookings.
              </p>
            </div>

            <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-6">
              <h3 className="font-semibold text-xl mb-3">Intelligent Qualification</h3>
              <p className="text-primary-foreground/70">
                Relay gathers dates, group sizes, and requirements upfront. Your team gets qualified leads, not vague questions.
              </p>
            </div>

            <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-6">
              <h3 className="font-semibold text-xl mb-3">Persistent Follow-Up</h3>
              <p className="text-primary-foreground/70">
                No reply? Relay follows up at the right intervals until you get an answer — without being pushy.
              </p>
            </div>

            <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-6">
              <h3 className="font-semibold text-xl mb-3">Works With Your Tools</h3>
              <p className="text-primary-foreground/70">
                Connects to your email, forms, and booking systems. No new software for your team to learn.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/relay">
              <Button variant="secondary" size="lg">
                See How Relay Works
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="border-t border-border">
        <div className="container py-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for venues that run on bookings
            </h2>
            <p className="text-lg text-muted-foreground">
              If your revenue depends on enquiries becoming confirmed bookings, Relay is for you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Boutique Hotels", desc: "Room bookings & events" },
              { name: "Wedding Venues", desc: "High-value, long-lead enquiries" },
              { name: "Lodges & Retreats", desc: "Group bookings & packages" },
              { name: "Event Restaurants", desc: "Private dining & functions" },
            ].map((venue) => (
              <div key={venue.name} className="p-5 rounded-xl bg-card border border-border text-center hover:border-accent/50 hover:shadow-md transition-all">
                <h3 className="font-semibold text-foreground mb-1">{venue.name}</h3>
                <p className="text-sm text-muted-foreground">{venue.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Final CTA */}
      <section className="border-t border-border bg-muted/30">
        <div className="container py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Stop losing revenue to missed enquiries
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              See how Relay works for your venue. 15-minute demo, no commitment.
            </p>
            <Link to="/contact">
              <Button variant="cta" size="xl">
                Book Your Demo
                <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
