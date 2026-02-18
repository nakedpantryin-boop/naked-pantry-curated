import type { CategoryConfig } from "@/lib/categoryConfig";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronRight, Home, Search, X } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryHeroProps {
  config: CategoryConfig;
  productCount: number | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const CategoryHero = ({ config, productCount, searchQuery, onSearchChange }: CategoryHeroProps) => {
  return (
    <div className={`bg-gradient-to-br ${config.heroGradient} border-b border-border`}>
      <div className="container mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
          <Link to="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">{config.title}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <Badge
              variant="secondary"
              className="mb-3 text-xs font-medium px-3 py-1 rounded-full bg-background/70 border border-border"
            >
              {config.badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              {config.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">{config.description}</p>
          </div>
          {productCount !== null && (
            <p className="text-sm text-muted-foreground shrink-0">
              <span className="font-semibold text-foreground text-2xl">{productCount}</span>{" "}
              products
            </p>
          )}
        </div>

        {/* Search bar */}
        <div className="relative max-w-xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder={`Search in ${config.title}…`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10 bg-background/80 backdrop-blur-sm border-border/60 focus-visible:ring-ring rounded-full h-11 text-sm shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;
