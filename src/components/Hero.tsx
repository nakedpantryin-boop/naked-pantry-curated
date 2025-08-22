import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
          Clean, Curated &amp; 
          <span className="text-primary block">Mindful Shopping</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover premium products free from harmful additives. We curate only the finest, 
          cleanest brands for conscious consumers who value quality and health.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="text-lg px-8 py-6 bg-sage hover:bg-sage-light text-primary-foreground rounded-full shadow-natural">
            Shop Clean Products
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-sage text-sage hover:bg-sage-lighter rounded-full">
            Learn Our Story
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-sage rounded-full"></div>
            <span>No Artificial Additives</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-sage rounded-full"></div>
            <span>Carefully Curated</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-sage rounded-full"></div>
            <span>Premium Quality</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;