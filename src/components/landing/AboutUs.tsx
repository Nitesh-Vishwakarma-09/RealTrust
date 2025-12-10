import { Button } from "@/components/ui/button";

const AboutUs = () => {
  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container mx-auto container-padding">
        {/* Image Gallery */}
        <div className="relative mb-16">
          <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="col-span-1 space-y-4">
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&h=200&fit=crop"
                alt="Interior design"
                className="w-full h-32 object-cover rounded-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=250&fit=crop"
                alt="Luxury home"
                className="w-full h-40 object-cover rounded-xl"
              />
            </div>
            <div className="col-span-1">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=350&fit=crop"
                alt="Modern living room"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="col-span-1 space-y-4">
              <img
                src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=300&h=250&fit=crop"
                alt="Kitchen design"
                className="w-full h-40 object-cover rounded-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=300&h=200&fit=crop"
                alt="Bedroom"
                className="w-full h-32 object-cover rounded-xl"
              />
            </div>
          </div>
          
          {/* Corner decorations */}
          <div className="absolute -top-4 left-1/4 w-8 h-8 border-2 border-secondary rounded" />
          <div className="absolute -bottom-4 right-1/4 w-8 h-8 border-2 border-primary rounded" />
        </div>

        {/* Content */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            About Us
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-8" />
          
          <p className="text-muted-foreground leading-relaxed mb-8">
            Fifteen years of experience in real estate. Our company's mission is to
            exceed standards, provide the highest level of customer service, build
            lasting relationships in the real estate industry, inspire to learn new methods of
            buying and selling properties effectively.
          </p>

          <Button variant="heroOutline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
