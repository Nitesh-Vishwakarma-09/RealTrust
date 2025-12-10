import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Hero = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        full_name: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        city: formData.city,
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your consultation request has been submitted. We'll contact you soon!",
      });

      setFormData({ fullName: "", email: "", mobile: "", city: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          alt="Luxury Home"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="container mx-auto container-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-primary-foreground animate-slide-in-left">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Consultation,
              <br />
              Design,
              <br />
              <span className="text-primary">&amp; Marketing</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-md mb-8">
              We help you find the perfect home with our expert consultation,
              stunning design services, and strategic marketing solutions.
            </p>
            <Button
              variant="hero"
              size="xl"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Properties
            </Button>
          </div>

          {/* Right Content - Contact Form */}
          <div className="bg-card rounded-2xl p-8 shadow-2xl animate-fade-in">
            <h2 className="font-serif text-2xl font-bold text-secondary mb-2 text-center">
              Get a Free Consultation
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              Fill out the form and we'll get back to you
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
                className="h-12 bg-muted border-0"
              />
              <Input
                type="email"
                placeholder="Enter Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="h-12 bg-muted border-0"
              />
              <Input
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                required
                className="h-12 bg-muted border-0"
              />
              <Input
                placeholder="Area, City"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
                className="h-12 bg-muted border-0"
              />
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Get Quick Quote"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-primary/20 rounded-full animate-float hidden lg:block" />
      <div className="absolute top-1/4 right-20 w-8 h-8 bg-primary rounded-full animate-float hidden lg:block" style={{ animationDelay: "1s" }} />
    </section>
  );
};

export default Hero;
