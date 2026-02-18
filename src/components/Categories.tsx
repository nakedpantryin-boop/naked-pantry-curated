import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/categoryConfig";

const Categories = () => {
  const navigate = useNavigate();

  // Show the first 4 categories in the homepage section
  const featured = CATEGORIES.slice(0, 4);

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
          {featured.map((category) => (
            <Card
              key={category.slug}
              className="group hover:shadow-luxury transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/category/${category.slug}`)}
            >
              <CardContent className="p-0">
                <div className={`bg-gradient-to-br ${category.heroGradient} p-8 text-center`}>
                  <div className="w-16 h-16 mx-auto mb-6 bg-background/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {category.label}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/category/${category.slug}`);
                    }}
                  >
                    Explore {category.label}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
