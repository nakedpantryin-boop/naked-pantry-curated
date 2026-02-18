import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ArrowLeft,
  ExternalLink,
  Loader2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
} from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "Secure Checkout", sub: "SSL encrypted" },
  { icon: Truck, label: "Free Shipping", sub: "On orders over ₹999" },
  { icon: RotateCcw, label: "Easy Returns", sub: "30-day policy" },
  { icon: Lock, label: "Safe Payments", sub: "Powered by Shopify" },
];

const CartPage = () => {
  const navigate = useNavigate();
  const {
    items,
    isLoading,
    isSyncing,
    updateQuantity,
    removeItem,
    getCheckoutUrl,
    syncCart,
  } = useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
    0
  );
  const currencyCode = items[0]?.price.currencyCode ?? "INR";

  useEffect(() => {
    syncCart();
  }, [syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page header */}
        <div className="bg-muted/40 border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Button>
            </div>
            <h1 className="text-3xl font-bold text-foreground mt-3">
              Your Cart
            </h1>
            {totalItems > 0 && (
              <p className="text-muted-foreground mt-1">
                {totalItems} item{totalItems !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          {items.length === 0 ? (
            /* ─── Empty state ─── */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-24 h-24 rounded-full bg-emerald-lighter flex items-center justify-center mb-6">
                <ShoppingCart className="w-10 h-10 text-emerald" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground max-w-sm mb-8">
                Looks like you haven't added anything yet. Explore our range of
                wholesome, clean-label snacks.
              </p>
              <Button
                className="bg-emerald hover:bg-emerald-light text-primary-foreground rounded-full px-8"
                onClick={() => navigate("/")}
              >
                Shop Now
              </Button>
            </div>
          ) : (
            /* ─── Cart layout ─── */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
              {/* Left — Cart items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                  {items.map((item, idx) => {
                    const image = item.product.node.images?.edges?.[0]?.node;
                    const itemTotal =
                      parseFloat(item.price.amount) * item.quantity;

                    return (
                      <div key={item.variantId}>
                        {idx > 0 && <Separator />}
                        <div className="flex gap-5 p-5">
                          {/* Thumbnail */}
                          <Link
                            to={`/product/${item.product.node.handle}`}
                            className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-muted block"
                          >
                            {image ? (
                              <img
                                src={image.url}
                                alt={image.altText || item.product.node.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ShoppingCart className="w-6 h-6 text-muted-foreground" />
                              </div>
                            )}
                          </Link>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/product/${item.product.node.handle}`}
                              className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug"
                            >
                              {item.product.node.title}
                            </Link>
                            {item.selectedOptions.length > 0 &&
                              !(
                                item.selectedOptions.length === 1 &&
                                item.selectedOptions[0].value === "Default Title"
                              ) && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {item.selectedOptions
                                    .map((o) => o.value)
                                    .join(" · ")}
                                </p>
                              )}
                            <p className="text-emerald font-semibold mt-1">
                              {currencyCode}{" "}
                              {parseFloat(item.price.amount).toFixed(2)}
                            </p>

                            {/* Quantity + remove (mobile-friendly row) */}
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-2 bg-muted rounded-full px-1 py-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 rounded-full hover:bg-background"
                                  onClick={() =>
                                    updateQuantity(
                                      item.variantId,
                                      item.quantity - 1
                                    )
                                  }
                                  disabled={isLoading}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm font-medium">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 rounded-full hover:bg-background"
                                  onClick={() =>
                                    updateQuantity(
                                      item.variantId,
                                      item.quantity + 1
                                    )
                                  }
                                  disabled={isLoading}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>

                              <div className="flex items-center gap-4">
                                <p className="font-bold text-foreground">
                                  {currencyCode} {itemTotal.toFixed(2)}
                                </p>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                  onClick={() => removeItem(item.variantId)}
                                  disabled={isLoading}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center text-center gap-1.5 rounded-xl border border-border bg-card p-3"
                    >
                      <Icon className="h-5 w-5 text-emerald" />
                      <p className="text-xs font-semibold text-foreground">
                        {label}
                      </p>
                      <p className="text-xs text-muted-foreground">{sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Order summary */}
              <div className="lg:col-span-1">
                <div className="rounded-2xl border border-border bg-card p-6 sticky top-24 space-y-5">
                  <h2 className="text-lg font-bold text-foreground">
                    Order Summary
                  </h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>
                        Subtotal ({totalItems} item
                        {totalItems !== 1 ? "s" : ""})
                      </span>
                      <span className="text-foreground font-medium">
                        {currencyCode} {subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span className="text-emerald font-medium">
                        Calculated at checkout
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Taxes</span>
                      <span className="text-foreground font-medium">
                        Calculated at checkout
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-foreground text-base">
                      Estimated Total
                    </span>
                    <span className="font-bold text-emerald text-xl">
                      {currencyCode} {subtotal.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-emerald hover:bg-emerald-light text-primary-foreground rounded-full h-12 text-base font-semibold"
                    disabled={isLoading || isSyncing}
                  >
                    {isLoading || isSyncing ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Proceed to Checkout
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    You'll be redirected to Shopify's secure checkout
                  </p>

                  {/* Promo / coupon note */}
                  <div className="rounded-xl bg-gold-lighter border border-gold/30 p-3 text-xs text-accent-foreground text-center">
                    🎁 Discount codes can be applied at checkout
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
