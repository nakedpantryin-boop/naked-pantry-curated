import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryHero from "@/components/category/CategoryHero";
import CategoryProductGrid from "@/components/category/CategoryProductGrid";
import CategoryNavBar from "@/components/product/CategoryNavBar";
import { CATEGORY_CONFIG } from "@/lib/categoryConfig";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const config = slug ? CATEGORY_CONFIG[slug] : undefined;

  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect to 404 if unknown category
  useEffect(() => {
    if (slug && !config) {
      navigate("/not-found", { replace: true });
    }
  }, [slug, config, navigate]);

  useEffect(() => {
    if (!config) return;
    setLoading(true);
    setProducts([]);
    setSearchQuery("");

    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, {
          first: 48,
          query: `tag:${config.tagQuery}`,
        });
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        }
      } catch (error) {
        console.error("Failed to fetch category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [config]);

  if (!config) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CategoryNavBar activeCategory={config.title} />
      <main className="flex-1">
        <CategoryHero
          config={config}
          productCount={loading ? null : products.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <CategoryProductGrid
          products={products}
          loading={loading}
          searchQuery={searchQuery}
        />
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
