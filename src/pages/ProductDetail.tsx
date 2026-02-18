import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryNavBar from "@/components/product/CategoryNavBar";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import NakedPantryTake from "@/components/product/NakedPantryTake";
import ProductCertifications from "@/components/product/ProductCertifications";
import ProductReviews from "@/components/product/ProductReviews";
import { Separator } from "@/components/ui/separator";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.product) {
          setProduct(data.data.product);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (handle) fetchProduct();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <CategoryNavBar />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-muted rounded-2xl aspect-square" />
            <div className="space-y-6">
              <div className="bg-muted h-10 rounded-lg w-3/4" />
              <div className="bg-muted h-6 rounded-lg w-1/3" />
              <div className="bg-muted h-8 rounded-lg w-1/4" />
              <div className="bg-muted h-32 rounded-lg" />
              <div className="bg-muted h-14 rounded-full w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <CategoryNavBar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Product not found</h1>
          <Button onClick={() => navigate("/")} variant="outline" className="rounded-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Store
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images.edges;
  const variants = product.variants.edges;
  const selectedVariant = variants[selectedVariantIndex]?.node;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success(`${product.title} added to cart`, { position: "top-center" });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <CategoryNavBar />

      <main className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="mb-6 text-muted-foreground hover:text-foreground -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Store
        </Button>

        {/* Product Hero: Image + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ProductImageGallery images={images} productTitle={product.title} />
          <ProductInfo
            title={product.title}
            description={product.description}
            variants={variants}
            options={product.options}
            selectedVariantIndex={selectedVariantIndex}
            onVariantChange={setSelectedVariantIndex}
            onAddToCart={handleAddToCart}
            isLoading={isLoading}
          />
        </div>

        <Separator className="mb-16" />

        {/* Naked Pantry's Take */}
        <div className="max-w-3xl mx-auto mb-16">
          <NakedPantryTake
            summary={product.nutritionistSummary?.value || undefined}
            highlights={
              product.nutritionistHighlights?.value
                ? (() => {
                    try {
                      return JSON.parse(product.nutritionistHighlights.value);
                    } catch {
                      // Single-line fallback if not JSON
                      return product.nutritionistHighlights.value
                        .split("\n")
                        .filter(Boolean);
                    }
                  })()
                : undefined
            }
          />
        </div>

        <Separator className="mb-16" />

        {/* Certifications & Lab Tests */}
        <div className="mb-16">
          <ProductCertifications
            metafieldJson={product.certifications?.value || undefined}
          />
        </div>

        <Separator className="mb-16" />

        {/* Reviews & Testimonials */}
        <div className="max-w-3xl mx-auto mb-16">
          <ProductReviews />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
