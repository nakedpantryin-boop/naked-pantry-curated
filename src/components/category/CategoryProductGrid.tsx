import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal, X, ShoppingCart, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { ShopifyProduct } from "@/lib/shopify";
import { DIET_FILTERS } from "@/lib/categoryConfig";

type SortOption = "featured" | "price-asc" | "price-desc" | "title-asc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "title-asc", label: "Name: A–Z" },
];

interface CategoryProductGridProps {
  products: ShopifyProduct[];
  loading: boolean;
  searchQuery?: string;
}

const CategoryProductGrid = ({ products, loading, searchQuery = "" }: CategoryProductGridProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const toggleFilter = (tag: string) => {
    setActiveFilters((prev) =>
      prev.includes(tag) ? prev.filter((f) => f !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => setActiveFilters([]);

  // Client-side filter: debounced search query + diet filters
  const filtered = useMemo(() => {
    let result = products;

    // Search by title or description (uses debounced value for perf)
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.node.title.toLowerCase().includes(q) ||
          (p.node.description ?? "").toLowerCase().includes(q)
      );
    }

    // Diet tag filters — match against real Shopify product tags
    if (activeFilters.length > 0) {
      result = result.filter((p) => {
        const productTags = (p.node.tags ?? []).map((t) => t.toLowerCase());
        return activeFilters.every((f) => productTags.includes(f.toLowerCase()));
      });
    }

    return result;
  }, [products, activeFilters, debouncedQuery]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const pa = parseFloat(a.node.priceRange.minVariantPrice.amount);
      const pb = parseFloat(b.node.priceRange.minVariantPrice.amount);
      if (sortBy === "price-asc") return pa - pb;
      if (sortBy === "price-desc") return pb - pa;
      if (sortBy === "title-asc")
        return a.node.title.localeCompare(b.node.title);
      return 0;
    });
  }, [filtered, sortBy]);

  const skeletons = Array.from({ length: 8 });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className={`rounded-full gap-2 transition-all ${
              sidebarOpen
                ? "bg-emerald text-primary-foreground border-emerald hover:bg-emerald-light"
                : ""
            }`}
            onClick={() => setSidebarOpen((v) => !v)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilters.length > 0 && (
              <Badge className="bg-gold text-foreground h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs ml-0.5">
                {activeFilters.length}
              </Badge>
            )}
          </Button>

          {activeFilters.length > 0 && (
            <>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((f) => {
                  const label = DIET_FILTERS.find((d) => d.tag === f)?.label ?? f;
                  return (
                    <Badge
                      key={f}
                      variant="secondary"
                      className="rounded-full gap-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      onClick={() => toggleFilter(f)}
                    >
                      {label}
                      <X className="w-3 h-3" />
                    </Badge>
                  );
                })}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground text-xs"
                onClick={clearFilters}
              >
                Clear all
              </Button>
            </>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full gap-2"
            onClick={() => setSortDropdownOpen((v) => !v)}
          >
            {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
            <ChevronDown className="w-4 h-4" />
          </Button>
          {sortDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 z-50 bg-card border border-border rounded-lg shadow-luxury overflow-hidden w-48">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-muted ${
                    sortBy === opt.value ? "text-primary font-medium" : "text-foreground"
                  }`}
                  onClick={() => {
                    setSortBy(opt.value);
                    setSortDropdownOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters */}
        {sidebarOpen && (
          <aside className="hidden md:block w-56 shrink-0">
            <div className="sticky top-36 bg-card border border-border rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground text-sm">Dietary & Health</h3>
                {activeFilters.length > 0 && (
                  <button
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    onClick={clearFilters}
                  >
                    Clear
                  </button>
                )}
              </div>
              <Separator className="mb-4" />
              <div className="flex flex-col gap-2">
                {DIET_FILTERS.map((filter) => {
                  const isActive = activeFilters.includes(filter.tag);
                  return (
                    <button
                      key={filter.tag}
                      onClick={() => toggleFilter(filter.tag)}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all text-left ${
                        isActive
                          ? "bg-emerald text-primary-foreground font-medium"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {filter.label}
                      {isActive && <X className="w-3 h-3 ml-1 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        )}

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {skeletons.map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-xl aspect-square mb-4" />
                  <div className="bg-muted h-4 rounded w-3/4 mb-2" />
                  <div className="bg-muted h-4 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mb-6" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground max-w-sm">
                {debouncedQuery
                  ? `No products match "${debouncedQuery}". Try a different keyword or `
                  : "We haven't added any products to this category yet — check back soon, or "}
                <button
                  className="text-primary underline"
                  onClick={clearFilters}
                >
                  clear your filters
                </button>
                .
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-5">
                {sorted.length} product{sorted.length !== 1 ? "s" : ""}
              </p>
              <div
                className={`grid gap-6 grid-cols-1 sm:grid-cols-2 ${
                  sidebarOpen
                    ? "lg:grid-cols-3"
                    : "lg:grid-cols-3 xl:grid-cols-4"
                }`}
              >
                {sorted.map((product) => (
                  <ProductCard key={product.node.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProductGrid;
