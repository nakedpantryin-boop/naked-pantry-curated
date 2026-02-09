import { useState } from "react";
import { ShoppingCart, ZoomIn } from "lucide-react";

interface ProductImage {
  node: {
    url: string;
    altText: string | null;
  };
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  productTitle: string;
}

const ProductImageGallery = ({ images, productTitle }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative aspect-square rounded-2xl overflow-hidden bg-muted cursor-zoom-in group"
        onClick={() => setIsZoomed(!isZoomed)}
      >
        {images[selectedImage]?.node ? (
          <>
            <img
              src={images[selectedImage].node.url}
              alt={images[selectedImage].node.altText || productTitle}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isZoomed ? "scale-150" : "group-hover:scale-105"
              }`}
            />
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-5 h-5 text-foreground" />
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingCart className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedImage(i);
                setIsZoomed(false);
              }}
              className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                i === selectedImage
                  ? "border-emerald ring-2 ring-emerald/20"
                  : "border-border hover:border-emerald-light"
              }`}
            >
              <img
                src={img.node.url}
                alt={img.node.altText || ""}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
