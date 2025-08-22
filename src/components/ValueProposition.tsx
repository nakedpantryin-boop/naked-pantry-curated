import { Shield, Eye, Heart } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Clean & Safe",
    description: "Every product is rigorously vetted to ensure it's free from harmful additives, artificial flavors, and unnecessary chemicals."
  },
  {
    icon: Eye,
    title: "Carefully Curated",
    description: "Our expert team hand-selects each brand and product, maintaining the highest standards for quality and integrity."
  },
  {
    icon: Heart,
    title: "Mindfully Made",
    description: "We partner with brands that share our commitment to health, sustainability, and ethical production practices."
  }
];

const ValueProposition = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose The Naked Pantry?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe that what you put in your body matters. That's why we've created 
            a marketplace that makes clean, conscious shopping accessible and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-sage-lighter to-cream rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft">
                  <IconComponent className="w-10 h-10 text-sage" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;