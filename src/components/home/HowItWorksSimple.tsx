const steps = [
  {
    number: "1",
    text: "We connect all your enquiry channels",
    detail: "Website, WhatsApp, Messenger",
  },
  {
    number: "2",
    text: "We make sure every lead is recorded",
    detail: "Nothing slips through",
  },
  {
    number: "3",
    text: "We help you respond faster and follow up automatically",
    detail: "No manual chasing",
  },
  {
    number: "4",
    text: "You close more bookings without extra work",
    detail: "That's it",
  },
];

const HowItWorksSimple = () => {
  return (
    <section className="border-t border-border">
      <div className="container py-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            How it works
          </h2>
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 text-accent font-semibold flex items-center justify-center">
                  {step.number}
                </div>
                <div className="pt-1">
                  <p className="text-foreground font-medium text-lg">
                    {step.text}
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSimple;
