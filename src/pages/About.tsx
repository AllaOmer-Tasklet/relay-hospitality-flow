import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              About Tasklet
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We build automation systems that work. No buzzwords, no complexity — just tools that handle the work your team doesn't have time for.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--amber)/0.05),transparent_50%)]"></div>
      </section>

      {/* Story */}
      <section className="border-t border-border">
        <div className="container py-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              Why we built Tasklet
            </h2>
            <div className="prose prose-lg text-muted-foreground space-y-4">
              <p>
                We started Tasklet because we saw the same pattern everywhere: small and mid-sized businesses drowning in repetitive work that should be automated, but stuck with tools built for enterprises.
              </p>
              <p>
                The automation tools on the market are either too simple (they break when things get real) or too complex (you need a developer to set them up). There's nothing in between.
              </p>
              <p>
                Tasklet builds automation systems that are powerful enough to handle real workflows, but simple enough that you don't need to hire someone to manage them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-muted/30 border-t border-border">
        <div className="container py-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
              How we work
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  We focus on specific problems
                </h3>
                <p className="text-muted-foreground">
                  Instead of building a platform that does everything badly, we build products that solve one problem really well. Relay is our first: enquiry capture and follow-up for hospitality venues.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  We integrate, not replace
                </h3>
                <p className="text-muted-foreground">
                  Our systems work with the tools you already use. We're not asking you to learn new software or change how your team works.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  We measure outcomes
                </h3>
                <p className="text-muted-foreground">
                  We're not interested in "time saved" or "efficiency gains." We care about real results: leads captured, revenue protected, opportunities converted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Hospitality First */}
      <section className="border-t border-border">
        <div className="container py-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              Why hospitality first
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Hospitality venues have a unique problem: high-value enquiries, time-sensitive decisions, and small teams stretched thin. A wedding venue might get 50 enquiries in January, and each one represents £10,000+ in potential revenue.
              </p>
              <p>
                But the teams handling those enquiries are also running events, managing staff, and keeping guests happy. Follow-ups fall through the cracks. Response times slip. Money gets left on the table.
              </p>
              <p>
                That's the problem Relay solves. And hospitality is where we're starting — but not where we're stopping.
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
              Want to work with us?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Whether you're a hospitality venue looking for Relay, or a business with a different automation challenge — let's talk.
            </p>
            <Link to="/contact">
              <Button variant="secondary" size="xl">
                Get in Touch
                <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
