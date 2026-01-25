import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "We were losing enquiries every weekend. Relay now handles everything while we focus on events.",
    author: "Sarah Mitchell",
    role: "Events Manager",
    venue: "The Manor House",
    initials: "SM",
  },
  {
    quote: "Response time dropped from hours to minutes. Our conversion rate is up 40% since we started.",
    author: "James Chen",
    role: "General Manager",
    venue: "Riverside Lodge",
    initials: "JC",
  },
  {
    quote: "Finally, a system that understands hospitality. No more leads falling through the cracks.",
    author: "Emma Thompson",
    role: "Owner",
    venue: "The Garden Room",
    initials: "ET",
  },
];

const Testimonials = () => {
  return (
    <section className="border-t border-border">
      <div className="container py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by venues that value every enquiry
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from hospitality professionals who stopped losing leads.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.author}
              className="bg-card border-border hover:border-accent/50 transition-colors"
            >
              <CardContent className="p-6">
                <blockquote className="text-foreground mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 bg-accent/10">
                    <AvatarFallback className="bg-accent/10 text-accent text-sm font-medium">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}, {testimonial.venue}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
