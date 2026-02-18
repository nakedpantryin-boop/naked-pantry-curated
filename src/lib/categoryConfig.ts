export interface CategoryConfig {
  slug: string;
  title: string;
  description: string;
  tagQuery: string; // Shopify product tag used for filtering
  heroGradient: string;
  accentColor: string;
  badge: string;
}

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  "healthy-snacks": {
    slug: "healthy-snacks",
    title: "Healthy Snacks",
    description:
      "Guilt-free snacking with clean, wholesome ingredients — every bite vetted by our nutritionists.",
    tagQuery: "healthy-snacks",
    heroGradient: "from-emerald-lighter via-background to-gold-lighter",
    accentColor: "emerald",
    badge: "🥜 Snack Better",
  },
  "pantry-staples": {
    slug: "pantry-staples",
    title: "Pantry Staples",
    description:
      "Essential pantry ingredients for mindful, intentional cooking — only the cleanest make the cut.",
    tagQuery: "pantry-staples",
    heroGradient: "from-gold-lighter via-background to-champagne",
    accentColor: "gold",
    badge: "🫙 Stock Clean",
  },
  supplements: {
    slug: "supplements",
    title: "Supplements",
    description:
      "Pure, potent nutrition to support your wellness goals — no fillers, no compromises.",
    tagQuery: "supplements",
    heroGradient: "from-emerald-lighter via-background to-emerald-lighter",
    accentColor: "emerald",
    badge: "💊 Pure Wellness",
  },
  "kid-friendly": {
    slug: "kid-friendly",
    title: "Kid Friendly",
    description:
      "Wholesome products your children will love — clean ingredients, no hidden nasties.",
    tagQuery: "kid-friendly",
    heroGradient: "from-gold-lighter via-background to-emerald-lighter",
    accentColor: "gold",
    badge: "👶 Family Approved",
  },
};

export const DIET_FILTERS = [
  { label: "Low Sugar", tag: "low-sugar" },
  { label: "High Fiber", tag: "high-fiber" },
  { label: "Gut Friendly", tag: "gut-friendly" },
  { label: "High Protein", tag: "high-protein" },
  { label: "Gluten Free", tag: "gluten-free" },
  { label: "Vegan", tag: "vegan" },
  { label: "Organic", tag: "organic" },
  { label: "Keto Friendly", tag: "keto-friendly" },
];
