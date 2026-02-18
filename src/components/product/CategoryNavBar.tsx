import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, X } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CATEGORIES, FILTER_OPTIONS } from "@/lib/categoryConfig";

interface CategoryNavBarProps {
  onFiltersChange?: (filters: string[]) => void;
}

const CategoryNavBar = ({ onFiltersChange }: CategoryNavBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Derive active category from current URL
  const activeSlug = location.pathname.startsWith("/category/")
    ? location.pathname.split("/category/")[1]
    : null;

  const handleCategoryClick = (slug: string | null) => {
    if (slug === null) {
      navigate("/");
    } else {
      navigate(`/category/${slug}`);
    }
  };

  const toggleFilter = (key: string) => {
    const updated = activeFilters.includes(key)
      ? activeFilters.filter((f) => f !== key)
      : [...activeFilters, key];
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
              showFilters
                ? "bg-primary text-primary-foreground border-primary"
                : ""
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
              {/* "All" pill */}
              <Button
                variant={activeSlug === null ? "default" : "ghost"}
                size="sm"
                className={`rounded-full flex-shrink-0 whitespace-nowrap transition-all ${
                  activeSlug === null
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => handleCategoryClick(null)}
              >
                All
              </Button>

              {CATEGORIES.map((cat) => (
                <Button
                  key={cat.slug}
                  variant={activeSlug === cat.slug ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-full flex-shrink-0 whitespace-nowrap transition-all ${
                    activeSlug === cat.slug
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => handleCategoryClick(cat.slug)}
                >
                  {cat.icon} {cat.label}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Expandable filter chips */}
        {showFilters && (
          <div className="pb-4 flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-200">
            {FILTER_OPTIONS.map((filter) => {
              const isActive = activeFilters.includes(filter.key);
              return (
                <Button
                  key={filter.key}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full text-xs transition-all ${
                    isActive
                      ? "bg-gold text-foreground hover:bg-gold-light border-gold"
                      : "border-border hover:border-primary"
                  }`}
                  onClick={() => toggleFilter(filter.key)}
                >
                  {filter.label}
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
