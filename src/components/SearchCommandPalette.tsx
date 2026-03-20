import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";

const SearchCommandPalette = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  const fetchProducts = useCallback(async (search: string) => {
    if (!search.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await storefrontApiRequest(PRODUCTS_QUERY, {
        first: 8,
        query: `title:*${search}*`,
      });
      setResults(data?.data?.products?.edges ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(() => fetchProducts(query), 300);
    return () => clearTimeout(debounceRef.current);
  }, [query, fetchProducts]);

  const handleSelect = (handle: string) => {
    onOpenChange(false);
    navigate(`/product/${handle}`);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search products…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        {loading && (
          <p className="py-4 text-center text-sm text-muted-foreground animate-pulse">
            Searching…
          </p>
        )}
        {!loading && query.trim() && results.length === 0 && (
          <CommandEmpty>No products found.</CommandEmpty>
        )}
        {results.length > 0 && (
          <CommandGroup heading="Products">
            {results.map((p) => {
              const node = p.node;
              const img = node.images.edges[0]?.node.url;
              const price = node.priceRange.minVariantPrice;
              return (
                <CommandItem
                  key={node.id}
                  value={node.title}
                  onSelect={() => handleSelect(node.handle)}
                  className="flex items-center gap-3 cursor-pointer py-2"
                >
                  {img ? (
                    <img
                      src={img}
                      alt={node.title}
                      className="h-10 w-10 rounded-md object-cover shrink-0"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-md bg-muted shrink-0" />
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium truncate">
                      {node.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {parseFloat(price.amount).toLocaleString("en-IN", {
                        style: "currency",
                        currency: price.currencyCode,
                      })}
                    </span>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommandPalette;
