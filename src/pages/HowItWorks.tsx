import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Connect Your Channels",
      description:
        "We integrate Relay with your website forms, email inbox, or any channel where enquiries come in. Takes about an hour to set up.",
    },
    {
      number: "02",
      title: "Configure Your Workflow",
      description:
        "Tell us what a qualified lead looks like — dates, group size, event type. We customize Relay's questions and responses to match your venue's voice.",
    },
    {
      number: "03",
      title: "Relay Goes to Work",
      description:
        "Every new enquiry gets acknowledged instantly. Relay asks the right questions, gathers the details you need, and follows up if there's no response.",
    },
    {
      number: "04",
      title: "You Get Qualified Leads",
      description:
        "When a lead is ready, Relay hands it off to your team with all the context they need to close the booking. No back-and-forth required.",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              How Relay Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From enquiry to qualified lead, automatically. Here's what happens behind the scenes.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--amber)/0.05),transparent_50%)]"></div>
      </section>

      {/* Steps */}
      <section className="border-t border-border">
        <div className="container py-20">
          <div className="max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex gap-6 pb-12 last:pb-0">
                {/* Line connector */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-14 w-0.5 h-[calc(100%-3.5rem)] bg-border"></div>
                )}

                {/* Number */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                  {step.number}
                </div>

                {/* Content */}
                <div className="pt-2">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Don't Have To Do */}
      <section className="bg-muted/30 border-t border-border">
        <div className="container py-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              What you don't have to do
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              "Learn new software",
              "Train your team on a new system",
              "Check another dashboard",
              "Write email templates",
              "Remember to follow up",
              "Manually qualify leads",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-card border border-border rounded-lg p-4">
                <div className="h-2 w-2 rounded-full bg-accent"></div>
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-border">
        <div className="container py-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Getting started timeline
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <p className="font-display text-3xl font-bold text-accent mb-2">Day 1</p>
              <p className="font-semibold text-foreground mb-1">Discovery Call</p>
              <p className="text-sm text-muted-foreground">
                15-minute call to understand your venue and enquiry workflow
              </p>
            </div>

            <div className="text-center p-6">
              <p className="font-display text-3xl font-bold text-accent mb-2">Day 2-3</p>
              <p className="font-semibold text-foreground mb-1">Setup & Configuration</p>
              <p className="text-sm text-muted-foreground">
                We connect Relay and customize it for your venue
              </p>
            </div>

            <div className="text-center p-6">
              <p className="font-display text-3xl font-bold text-accent mb-2">Day 4+</p>
              <p className="font-semibold text-foreground mb-1">Live & Learning</p>
              <p className="text-sm text-muted-foreground">
                Relay handles enquiries while we fine-tune based on results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to stop missing enquiries?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Book a 15-minute call. We'll walk through how Relay would work for your specific venue.
            </p>
            <Link to="/contact">
              <Button variant="secondary" size="xl">
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

export default HowItWorks;
