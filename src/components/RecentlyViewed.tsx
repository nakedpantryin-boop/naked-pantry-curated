import { useRecentlyViewedStore } from "@/stores/recentlyViewedStore";
import ProductCard from "@/components/ProductCard";
import type { ShopifyProduct } from "@/lib/shopify";

interface RecentlyViewedProps {
  /** Product IDs to exclude (e.g. current product or cart items) */
  excludeIds?: Set<string>;
  maxItems?: number;
}

const RecentlyViewed = ({ excludeIds, maxItems = 4 }: RecentlyViewedProps) => {
  const products = useRecentlyViewedStore((s) => s.products);

  const visible: ShopifyProduct[] = products
    .filter((p) => !excludeIds?.has(p.node.id))
    .slice(0, maxItems);

  if (visible.length === 0) return null;

  return (
    <section className="border-t border-border py-14">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
            Based on your browsing
          </p>
          <h2 className="text-2xl font-bold text-foreground">
            Recently viewed
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {visible.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
