import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const { title, handle, priceRange, images, variants } = product.node;
  const image = images.edges[0]?.node;
  const firstVariant = variants.edges[0]?.node;
  const price = priceRange.minVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!firstVariant) return;

    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });

    toast.success(`${title} added to cart`, { position: "top-center" });
  };

  return (
    <Card
      className="group cursor-pointer hover:shadow-luxury transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden bg-card"
      onClick={() => navigate(`/product/${handle}`)}
    >
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden bg-muted">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-foreground text-lg mb-1 truncate group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-emerald font-bold text-lg mb-4">
            {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
          </p>
          <Button
            onClick={handleAddToCart}
            disabled={isLoading || !firstVariant?.availableForSale}
            className="w-full bg-emerald hover:bg-emerald-light text-primary-foreground rounded-full"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : !firstVariant?.availableForSale ? (
              "Sold Out"
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
