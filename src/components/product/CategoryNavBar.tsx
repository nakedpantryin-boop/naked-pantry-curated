import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, X } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const categories = [
  "All",
  "Healthy Snacks",
  "Pantry Staples",
  "Superfoods",
  "Beverages",
  "Supplements",
  "Kid Friendly",
  "Breakfast",
  "Baking",
];

const filters = [
  "Low Sugar",
  "High Fiber",
  "Gut Friendly",
  "High Protein",
  "Gluten Free",
  "Vegan",
  "Organic",
  "Keto Friendly",
];

interface CategoryNavBarProps {
  onCategoryChange?: (category: string) => void;
  onFiltersChange?: (filters: string[]) => void;
}

const CategoryNavBar = ({ onCategoryChange, onFiltersChange }: CategoryNavBarProps) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategoryChange?.(category);
  };

  const toggleFilter = (filter: string) => {
    const updated = activeFilters.includes(filter)
      ? activeFilters.filter((f) => f !== filter)
      : [...activeFilters, filter];
    setActiveFilters(updated);
    onFiltersChange?.(updated);
  };

  return (
    <div className="border-b border-border bg-background sticky top-[73px] z-40">
      <div className="container mx-auto px-4">
        {/* Category scrollbar + filter toggle */}
        <div className="flex items-center gap-4 py-3">
          <Button
            variant="outline"
            size="sm"
            className={`flex-shrink-0 rounded-full gap-2 ${
              showFilters ? "bg-emerald text-primary-foreground border-emerald" : ""
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilters.length > 0 && (
              <Badge className="bg-gold text-foreground h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs">
                {activeFilters.length}
              </Badge>
            )}
          </Button>

          <ScrollArea className="flex-1">
            <div className="flex items-center gap-2 pb-1">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-full flex-shrink-0 whitespace-nowrap transition-all ${
                    activeCategory === category
                      ? "bg-emerald text-primary-foreground hover:bg-emerald-light"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Expandable filter chips */}
        {showFilters && (
          <div className="pb-4 flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-200">
            {filters.map((filter) => {
              const isActive = activeFilters.includes(filter);
              return (
                <Button
                  key={filter}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full text-xs transition-all ${
                    isActive
                      ? "bg-gold text-foreground hover:bg-gold-light border-gold"
                      : "border-border hover:border-emerald"
                  }`}
                  onClick={() => toggleFilter(filter)}
                >
                  {filter}
                  {isActive && <X className="w-3 h-3 ml-1" />}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryNavBar;
