const NotYourAverageRealtor = () => {
  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container mx-auto container-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Decorative circle */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary rounded-full opacity-10" />
              
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6 relative">
                Not Your Average Realtor
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                With over a decade of experience in luxury real estate, we go beyond
                the ordinary to deliver extraordinary results. Our team combines
                market expertise with personalized service to ensure every client
                receives the attention they deserve.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe in building lasting relationships, not just closing deals.
                Our commitment to excellence and integrity sets us apart in an
                industry where trust is everything.
              </p>
            </div>
          </div>

          {/* Right Content - Images */}
          <div className="order-1 lg:order-2 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop"
                  alt="Realtor consultation"
                  className="w-full h-48 object-cover rounded-2xl card-elevated"
                />
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=200&fit=crop"
                  alt="Modern home interior"
                  className="w-full h-32 object-cover rounded-2xl card-elevated"
                />
              </div>
              <div className="pt-8">
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=400&fit=crop"
                  alt="Happy homeowners"
                  className="w-full h-64 object-cover rounded-2xl card-elevated"
                />
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary rounded-full opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotYourAverageRealtor;
