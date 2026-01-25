import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { ArrowRight, Check, Mail, MessageCircle, RefreshCw, Zap } from "lucide-react";

const Relay = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-foreground mb-6">
              <Zap className="h-4 w-4 text-accent" />
              The Flagship Product from Tasklet
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Relay
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4">
              Enquiry capture and follow-up that runs 24/7
            </p>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              For hotels, venues, and restaurants that can't afford to let leads go cold.
            </p>

            <Link to="/contact">
              <Button variant="cta" size="xl">
                Get Relay for Your Venue
                <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--amber)/0.1),transparent_50%)]"></div>
      </section>

      {/* Value Prop */}
      <section className="border-t border-border">
        <div className="container py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              What Relay does
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    Captures Every Enquiry
                  </h3>
                  <p className="text-muted-foreground">
                    Connects to your website forms, email inbox, and messaging channels. Nothing gets missed, nothing gets lost.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    Responds Instantly
                  </h3>
                  <p className="text-muted-foreground">
                    Sends a personalized acknowledgment within minutes. Your potential guests know they've been heard.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Check className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    Qualifies Leads Upfront
                  </h3>
                  <p className="text-muted-foreground">
                    Gathers key details — dates, group size, requirements — so your team gets ready-to-close leads, not vague questions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    Follows Up Automatically
                  </h3>
                  <p className="text-muted-foreground">
                    No reply? Relay sends polite follow-ups at the right intervals. You get answers without chasing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It's Different */}
      <section className="bg-muted/30 border-t border-border">
        <div className="container py-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Not a chatbot. Not a CRM.
            </h2>
            <p className="text-lg text-muted-foreground">
              Relay is purpose-built for enquiry-to-booking workflows. It handles the work between "I'm interested" and "Let's book a call."
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-3">No New Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Relay works behind the scenes. Your team keeps using email — they just get better leads in their inbox.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-3">No AI Hallucinations</h3>
              <p className="text-sm text-muted-foreground">
                Relay doesn't make things up. It asks smart questions and routes qualified leads to your team.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-3">No Generic Templates</h3>
              <p className="text-sm text-muted-foreground">
                Every message is customized to your venue's voice and the specifics of each enquiry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-t border-border">
        <div className="container py-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              The results you'll see
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <p className="font-display text-4xl font-bold text-accent mb-2">100%</p>
              <p className="text-muted-foreground">Enquiries acknowledged within minutes</p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-accent mb-2">Fewer</p>
              <p className="text-muted-foreground">Leads going cold without follow-up</p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-accent mb-2">More</p>
              <p className="text-muted-foreground">Time for your team to close bookings</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              See Relay in action
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              15-minute demo. We'll show you exactly how Relay would work for your venue.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button variant="secondary" size="xl">
                  Book a Demo
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="ghost" size="xl" className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Relay;
