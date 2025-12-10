import { Target, Palette, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Potential ROI",
    description:
      "Our data-driven approach ensures maximum return on your real estate investment through strategic market analysis.",
  },
  {
    icon: Palette,
    title: "Design",
    description:
      "Transform any property into a stunning showcase with our interior design and staging expertise.",
  },
  {
    icon: TrendingUp,
    title: "Marketing",
    description:
      "Cutting-edge marketing strategies that put your property in front of qualified buyers quickly and effectively.",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="services" className="section-padding bg-muted/30">
      <div className="container mx-auto container-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Us?
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center p-8 bg-card rounded-2xl card-elevated animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative element */}
        <div className="flex justify-end mt-8">
          <div className="w-6 h-6 bg-primary rounded-full opacity-60" />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
