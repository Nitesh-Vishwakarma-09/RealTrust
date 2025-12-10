import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string | null;
}

const OurProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="section-padding bg-muted/30">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Projects
            </h2>
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding bg-muted/30">
      <div className="container mx-auto container-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We know what buyers are looking for and suggest projects that will bring
            clients top dollar for the sale of their homes.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-card rounded-2xl overflow-hidden card-elevated animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image_url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400"}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <span className="text-primary font-semibold text-sm">
                  {project.category}
                </span>
                <h3 className="font-medium text-foreground mt-1 mb-3 line-clamp-2">
                  {project.name}
                </h3>
                <Button variant="hero" size="sm" className="w-full">
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative dot */}
        <div className="flex justify-center mt-8">
          <div className="w-3 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default OurProjects;
