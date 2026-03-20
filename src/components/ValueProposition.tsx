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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our mission is to make healthy living simple and accessible by offering clean groceries free from harmful ingredients. We are committed to educating and empowering our community to make better choices for themselves and their families.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-lighter to-gold-lighter rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-luxury">
                  <IconComponent className="w-10 h-10 text-emerald" />
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