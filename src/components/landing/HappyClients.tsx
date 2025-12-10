import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Quote } from "lucide-react";

interface Client {
  id: string;
  name: string;
  designation: string;
  description: string;
  image_url: string | null;
}

const HappyClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data, error } = await supabase
          .from("clients")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setClients(data || []);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return (
      <section id="testimonials" className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Happy Clients
            </h2>
            <p className="text-muted-foreground">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="section-padding bg-background">
      <div className="container mx-auto container-padding">
        {/* Decorative element */}
        <div className="flex justify-center mb-4">
          <div className="w-3 h-3 bg-primary rounded-full" />
        </div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Happy Clients
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Clients Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {clients.map((client, index) => (
            <div
              key={client.id}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-4">
                <Quote className="w-8 h-8 text-primary/30" />
              </div>

              {/* Testimonial Text */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-4">
                {client.description}
              </p>

              {/* Avatar */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary/20">
                <img
                  src={client.image_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"}
                  alt={client.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name & Designation */}
              <h4 className="font-semibold text-primary">{client.name}</h4>
              <p className="text-muted-foreground text-sm">{client.designation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HappyClients;
