import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.string().trim().email({ message: "Please enter a valid email" }).max(255);

const SimpleEmailCapture = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({
        title: "Invalid email",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke("send-notification", {
        body: {
          type: "email_capture",
          email: result.data,
        },
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Thanks!",
        description: "We'll be in touch soon.",
      });
    } catch (error) {
      console.error("Error submitting email:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container py-16">
        <div className="max-w-md mx-auto text-center">
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
            Is this relevant for you?
          </h2>
          <p className="text-muted-foreground mb-6">
            Drop your email. We'll reach out if it makes sense.
          </p>
          
          {isSubmitted ? (
            <div className="bg-accent/10 text-accent rounded-lg py-4 px-6">
              <p className="font-medium">Got it — we'll be in touch.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                type="email"
                placeholder="you@venue.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
                maxLength={255}
              />
              <Button 
                type="submit" 
                variant="cta"
                disabled={isSubmitting}
              >
                {isSubmitting ? "..." : "Submit"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default SimpleEmailCapture;
