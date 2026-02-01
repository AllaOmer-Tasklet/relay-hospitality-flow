import { CheckCircle } from "lucide-react";

const LiveDeployments = () => {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
            Live at
          </p>
          <div className="inline-flex items-center gap-3 bg-card border border-border rounded-lg px-6 py-4">
            <CheckCircle className="h-5 w-5 text-accent" />
            <div className="text-left">
              <p className="font-semibold text-foreground">Bellini's, Newry</p>
              <p className="text-sm text-muted-foreground">Enquiry capture & follow-up installed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDeployments;
