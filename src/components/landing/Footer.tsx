import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        });
        setEmail("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer id="contact" className="relative">
      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
            alt="Modern home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="container mx-auto container-padding relative z-10 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Learn more about our listing process, as well as our
            <br className="hidden md:block" />
            additional staging and design work.
          </h2>
          <Button
            variant="heroOutline"
            size="lg"
            className="mt-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-secondary py-6">
        <div className="container mx-auto container-padding">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Navigation Links */}
            <nav className="flex flex-wrap items-center justify-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-secondary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Newsletter */}
            <form
              onSubmit={handleSubscribe}
              className="flex items-center gap-2"
            >
              <span className="text-secondary-foreground text-sm whitespace-nowrap">
                Subscribe Us
              </span>
              <Input
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10 bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50 w-48"
              />
              <Button
                type="submit"
                variant="hero"
                size="default"
                disabled={isSubmitting}
              >
                {isSubmitting ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-secondary/90 py-4">
        <div className="container mx-auto container-padding">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-secondary-foreground/60 text-sm">
              © {new Date().getFullYear()} RealTrust. All rights reserved.
            </p>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">R</span>
              </div>
              <span className="font-serif text-secondary-foreground font-bold">
                Real<span className="text-primary">Trust</span>
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-8 h-8 bg-secondary-foreground/10 rounded-full flex items-center justify-center text-secondary-foreground/60 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
