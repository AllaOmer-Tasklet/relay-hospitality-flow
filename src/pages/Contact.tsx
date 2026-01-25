import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import { Mail, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    venueName: "",
    venueType: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "We'll be in touch within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      venueName: "",
      venueType: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              Book a Demo
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              15 minutes. We'll show you exactly how Relay would work for your venue. No commitment, no sales pressure.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--amber)/0.05),transparent_50%)]"></div>
      </section>

      {/* Form */}
      <section className="border-t border-border">
        <div className="container py-20">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Form Column */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Tell us about your venue
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@venue.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="venueName">Venue name</Label>
                    <Input
                      id="venueName"
                      name="venueName"
                      value={formData.venueName}
                      onChange={handleChange}
                      required
                      placeholder="The Grand Hotel"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="venueType">Venue type</Label>
                    <select
                      id="venueType"
                      name="venueType"
                      value={formData.venueType}
                      onChange={handleChange}
                      required
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select type...</option>
                      <option value="hotel">Hotel / B&B</option>
                      <option value="wedding">Wedding Venue</option>
                      <option value="lodge">Lodge / Retreat</option>
                      <option value="restaurant">Restaurant / Event Space</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Tell us about your enquiry challenges (optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="E.g., We get 30+ wedding enquiries a month but struggle to follow up on all of them..."
                    rows={4}
                  />
                </div>

                <Button type="submit" variant="cta" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Request a Demo"}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Info Column */}
            <div className="lg:pl-8">
              <div className="bg-muted/30 border border-border rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-foreground mb-4">What happens next</h3>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-medium">1</span>
                    We'll respond within 24 hours to schedule a call
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-medium">2</span>
                    15-minute demo tailored to your venue type
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-medium">3</span>
                    If it's a fit, we can have you live within days
                  </li>
                </ol>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Prefer email?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Reach out directly and we'll get back to you within 24 hours.
                </p>
                <a
                  href="mailto:hello@tasklet.io"
                  className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                >
                  <Mail className="h-4 w-4" />
                  hello@tasklet.io
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
