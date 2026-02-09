import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Loader2, Star } from "lucide-react";

interface Variant {
  node: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    availableForSale: boolean;
    selectedOptions: Array<{ name: string; value: string }>;
  };
}

interface ProductOption {
  name: string;
  values: string[];
}

interface ProductInfoProps {
  title: string;
  description: string;
  variants: Variant[];
  options: ProductOption[];
  selectedVariantIndex: number;
  onVariantChange: (index: number) => void;
  onAddToCart: () => void;
  isLoading: boolean;
  rating?: number;
  reviewCount?: number;
}

const ProductInfo = ({
  title,
  description,
  variants,
  options,
  selectedVariantIndex,
  onVariantChange,
  onAddToCart,
  isLoading,
  rating = 4.5,
  reviewCount = 24,
}: ProductInfoProps) => {
  const selectedVariant = variants[selectedVariantIndex]?.node;
  const hasMultipleVariants =
    variants.length > 1 &&
    !(variants.length === 1 && variants[0].node.title === "Default Title");

  return (
    <div className="space-y-6">
      {/* Title & Rating */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          {title}
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(rating)
                    ? "fill-gold text-gold"
                    : i < rating
                    ? "fill-gold/50 text-gold"
                    : "text-border"
                }`}
              />
            ))}
          </div>
          <span className="text-muted-foreground text-sm">
            {rating} ({reviewCount} reviews)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-emerald">
          {selectedVariant?.price.currencyCode}{" "}
          {parseFloat(selectedVariant?.price.amount || "0").toFixed(2)}
        </span>
        {selectedVariant?.availableForSale ? (
          <Badge variant="secondary" className="bg-emerald-lighter text-emerald font-medium">
            In Stock
          </Badge>
        ) : (
          <Badge variant="destructive">Sold Out</Badge>
        )}
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed text-lg">
        {description}
      </p>

      {/* Variants */}
      {hasMultipleVariants && (
        <div className="space-y-4">
          {options.map((option) => (
            <div key={option.name}>
              <label className="block text-sm font-semibold text-foreground mb-3">
                {option.name}
              </label>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const variantIndex = variants.findIndex((v) =>
                    v.node.selectedOptions.some(
                      (so) => so.name === option.name && so.value === value
                    )
                  );
                  const isSelected = selectedVariant?.selectedOptions.some(
                    (so) => so.name === option.name && so.value === value
                  );
                  return (
                    <Button
                      key={value}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      className={`rounded-full transition-all ${
                        isSelected
                          ? "bg-emerald hover:bg-emerald-light text-primary-foreground shadow-md"
                          : "hover:border-emerald"
                      }`}
                      onClick={() => {
                        if (variantIndex >= 0) onVariantChange(variantIndex);
                      }}
                    >
                      {value}
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add to Cart */}
      <Button
        onClick={onAddToCart}
        disabled={isLoading || !selectedVariant?.availableForSale}
        size="lg"
        className="w-full bg-emerald hover:bg-emerald-light text-primary-foreground rounded-full px-12 h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : !selectedVariant?.availableForSale ? (
          "Sold Out"
        ) : (
          <>
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </>
        )}
      </Button>
    </div>
  );
};

export default ProductInfo;
