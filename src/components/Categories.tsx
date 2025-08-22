import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Apple, Package, Pill, Baby } from "lucide-react";

const categories = [
  {
    title: "Healthy Snacks",
    description: "Guilt-free snacking with clean ingredients",
    icon: Apple,
    color: "bg-gradient-to-br from-sage-lighter to-cream"
  },
  {
    title: "Pantry Staples", 
    description: "Essential ingredients for mindful cooking",
    icon: Package,
    color: "bg-gradient-to-br from-cream to-sage-lighter"
  },
  {
    title: "Supplements",
    description: "Pure nutrition to support your wellness",
    icon: Pill,
    color: "bg-gradient-to-br from-sage-lighter to-accent"
  },
  {
    title: "Kid Friendly",
    description: "Wholesome products your children will love",
    icon: Baby,
    color: "bg-gradient-to-br from-accent to-cream"
  }
];

const Categories = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Shop by Category
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every product in our marketplace is carefully selected to meet our strict standards 
            for clean, healthy living.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="group hover:shadow-natural transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className={`${category.color} p-8 text-center`}>
                    <div className="w-16 h-16 mx-auto mb-6 bg-background/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-sage" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {category.description}
                    </p>
                    <Button variant="outline" className="border-sage text-sage hover:bg-sage hover:text-primary-foreground rounded-full">
                      Explore {category.title}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;