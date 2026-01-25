import { Mail, Bot, ClipboardCheck, RefreshCw, UserCheck } from "lucide-react";

const steps = [
  {
    icon: Mail,
    title: "Enquiry Arrives",
    description: "Email, form, or call — all captured in one place",
  },
  {
    icon: Bot,
    title: "Instant Response",
    description: "Relay acknowledges within minutes, not hours",
  },
  {
    icon: ClipboardCheck,
    title: "Smart Qualification",
    description: "Collects dates, group size, and requirements",
  },
  {
    icon: RefreshCw,
    title: "Persistent Follow-Up",
    description: "Automatic nudges until you get an answer",
  },
  {
    icon: UserCheck,
    title: "Qualified Lead Delivered",
    description: "Your team gets ready-to-convert bookings",
  },
];

const RelayWorkflow = () => {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container py-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground mb-6">
            How Relay Works
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            From enquiry to booking, automatically
          </h2>
          <p className="text-lg text-muted-foreground">
            Relay handles the entire lead journey so your team can focus on what matters.
          </p>
        </div>

        {/* Desktop workflow */}
        <div className="hidden lg:block max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20" />
            
            {/* Steps */}
            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <div key={step.title} className="relative flex flex-col items-center text-center">
                  {/* Icon circle */}
                  <div className="relative z-10 flex items-center justify-center h-24 w-24 rounded-full bg-background border-2 border-accent shadow-lg mb-4">
                    <step.icon className="h-10 w-10 text-accent" />
                  </div>
                  
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 z-20 flex items-center justify-center h-7 w-7 rounded-full bg-accent text-accent-foreground text-sm font-bold">
                    {index + 1}
                  </div>
                  
                  <h3 className="font-semibold text-foreground mb-1 text-sm">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile workflow */}
        <div className="lg:hidden max-w-sm mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b from-accent via-accent to-accent/20" />
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={step.title} className="relative flex items-start gap-4">
                  {/* Icon circle */}
                  <div className="relative z-10 flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-background border-2 border-accent shadow-md">
                    <step.icon className="h-7 w-7 text-accent" />
                    {/* Step number */}
                    <div className="absolute -top-1 -right-1 flex items-center justify-center h-6 w-6 rounded-full bg-accent text-accent-foreground text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="pt-3">
                    <h3 className="font-semibold text-foreground mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelayWorkflow;
