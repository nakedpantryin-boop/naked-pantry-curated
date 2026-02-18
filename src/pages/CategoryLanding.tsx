import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import {
  CATEGORIES,
  FILTER_OPTIONS,
  SORT_OPTIONS,
  getCategoryBySlug,
} from "@/lib/categoryConfig";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  SlidersHorizontal,
  Search,
  X,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";

// ─── Skeleton ────────────────────────────────────────────────────────────────
const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-muted rounded-lg aspect-square mb-4" />
    <div className="bg-muted h-4 rounded w-3/4 mb-2" />
    <div className="bg-muted h-4 rounded w-1/2 mb-4" />
    <div className="bg-muted h-9 rounded-full" />
  </div>
);

// ─── Sidebar Filters ─────────────────────────────────────────────────────────
interface FilterSidebarProps {
  activeFilters: string[];
  onToggleFilter: (key: string) => void;
  onClearAll: () => void;
  productCount: number;
}

const FilterSidebar = ({
  activeFilters,
  onToggleFilter,
  onClearAll,
  productCount,
}: FilterSidebarProps) => (
  <aside className="w-64 flex-shrink-0 hidden lg:block">
    <div className="sticky top-[73px] pt-6">
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-primary" />
            Filters
          </h3>
          {activeFilters.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          {productCount} product{productCount !== 1 ? "s" : ""} found
        </p>

        <Separator className="mb-4" />

        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Dietary & Health
          </p>
          {FILTER_OPTIONS.map((filter) => {
            const active = activeFilters.includes(filter.key);
            return (
              <button
                key={filter.key}
                onClick={() => onToggleFilter(filter.key)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                  active
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span>{filter.label}</span>
                {active && <X className="w-3 h-3" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  </aside>
);

// ─── Category Nav ─────────────────────────────────────────────────────────────
const CategoryNav = ({ activeSlug }: { activeSlug: string }) => {
  const navigate = useNavigate();
  return (
    <div className="border-b border-border bg-background sticky top-[73px] z-40">
      <div className="container mx-auto px-4">
        <ScrollArea className="w-full py-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full flex-shrink-0 whitespace-nowrap text-muted-foreground hover:text-foreground"
              onClick={() => navigate("/")}
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
                onClick={() => navigate(`/category/${cat.slug}`)}
              >
                {cat.icon} {cat.label}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const CategoryLanding = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug ?? "");

  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Fetch products for this category via Shopify tag query
  useEffect(() => {
    if (!category) return;
    setLoading(true);
    setProducts([]);

    storefrontApiRequest(PRODUCTS_QUERY, {
      first: 50,
      query: category.shopifyQuery,
    })
      .then((data) => {
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        }
      })
      .catch((err) => console.error("Failed to fetch category products:", err))
      .finally(() => setLoading(false));
  }, [category]);

  // Client-side filter: tag filters map to product tags (if available) — here
  // we filter by search text since Shopify tags aren't in our current query.
  // The filter chips serve as UI state that could wire into a refined API query.
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search by title / description
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.node.title.toLowerCase().includes(q) ||
          p.node.description.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortKey) {
      case "price-asc":
        result.sort(
          (a, b) =>
            parseFloat(a.node.priceRange.minVariantPrice.amount) -
            parseFloat(b.node.priceRange.minVariantPrice.amount)
        );
        break;
      case "price-desc":
        result.sort(
          (a, b) =>
            parseFloat(b.node.priceRange.minVariantPrice.amount) -
            parseFloat(a.node.priceRange.minVariantPrice.amount)
        );
        break;
      case "title-asc":
        result.sort((a, b) => a.node.title.localeCompare(b.node.title));
        break;
      case "title-desc":
        result.sort((a, b) => b.node.title.localeCompare(a.node.title));
        break;
    }

    return result;
  }, [products, searchQuery, sortKey]);

  const toggleFilter = (key: string) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  // Unknown category fallback
  if (!category) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Category not found
          </h1>
          <p className="text-muted-foreground mb-8">
            The category you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryNav activeSlug={slug ?? ""} />

      {/* ── Hero Banner ──────────────────────────────────────── */}
      <div
        className={`bg-gradient-to-r ${category.heroGradient} border-b border-border`}
      >
        <div className="container mx-auto px-4 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{category.label}</span>
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {category.label}
              </h1>
              <p className="text-muted-foreground mt-1 max-w-xl">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Toolbar ──────────────────────────────────────────── */}
      <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-[114px] z-30">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rounded-full border-border bg-muted h-9 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Mobile filter toggle */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden rounded-full gap-2"
            onClick={() => setMobileFiltersOpen((v) => !v)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilters.length > 0 && (
              <Badge className="bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs">
                {activeFilters.length}
              </Badge>
            )}
          </Button>

          {/* Sort */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Sort:
            </span>
            <Select value={sortKey} onValueChange={setSortKey}>
              <SelectTrigger className="w-44 h-9 rounded-full text-sm border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((o) => (
                  <SelectItem key={o.key} value={o.key}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active filter chips */}
          {activeFilters.length > 0 && (
            <div className="w-full flex flex-wrap gap-2 pt-1">
              {activeFilters.map((key) => {
                const label = FILTER_OPTIONS.find((f) => f.key === key)?.label;
                return (
                  <Badge
                    key={key}
                    className="rounded-full bg-primary/10 text-primary border-primary/20 gap-1 cursor-pointer hover:bg-primary/20 transition-colors"
                    onClick={() => toggleFilter(key)}
                  >
                    {label}
                    <X className="w-3 h-3" />
                  </Badge>
                );
              })}
              <button
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setActiveFilters([])}
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Mobile filter drawer */}
        {mobileFiltersOpen && (
          <div className="lg:hidden border-t border-border bg-background px-4 py-4 flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-200">
            {FILTER_OPTIONS.map((filter) => {
              const active = activeFilters.includes(filter.key);
              return (
                <Button
                  key={filter.key}
                  variant={active ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full text-xs transition-all ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                  onClick={() => toggleFilter(filter.key)}
                >
                  {filter.label}
                  {active && <X className="w-3 h-3 ml-1" />}
                </Button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Body: Sidebar + Grid ─────────────────────────────── */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <FilterSidebar
            activeFilters={activeFilters}
            onToggleFilter={toggleFilter}
            onClearAll={() => setActiveFilters([])}
            productCount={filteredProducts.length}
          />

          {/* Product Grid */}
          <main className="flex-1 min-w-0">
            {/* Results summary */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {loading
                  ? "Loading…"
                  : `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""}`}
                {searchQuery && !loading && ` for "${searchQuery}"`}
              </p>
            </div>

            {/* Loading state */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-24">
                <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  No products found
                </h2>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  {searchQuery || activeFilters.length > 0
                    ? "Try adjusting your search or removing some filters."
                    : `No products have been tagged "${category.shopifyQuery}" in Shopify yet.`}
                </p>
                {(searchQuery || activeFilters.length > 0) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveFilters([]);
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            )}

            {/* Products */}
            {!loading && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.node.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── Related Categories ───────────────────────────────── */}
      {!loading && (
        <div className="border-t border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Explore Other Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {CATEGORIES.filter((c) => c.slug !== slug).map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className={`bg-gradient-to-br ${cat.heroGradient} rounded-xl p-4 flex items-center gap-3 group hover:shadow-md transition-all`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                    {cat.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CategoryLanding;
