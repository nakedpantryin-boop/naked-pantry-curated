// Category configuration — single source of truth for all category pages

export interface CategoryConfig {
  slug: string;
  label: string;
  description: string;
  shopifyQuery: string; // Storefront API product query string
  heroGradient: string; // Tailwind gradient classes
  icon: string; // emoji
}

export const CATEGORIES: CategoryConfig[] = [
  {
    slug: "healthy-snacks",
    label: "Healthy Snacks",
    description: "Guilt-free snacking with clean ingredients — every bite, vetted.",
    shopifyQuery: "tag:healthy-snacks",
    heroGradient: "from-emerald-lighter to-gold-lighter",
    icon: "🥜",
  },
  {
    slug: "pantry-staples",
    label: "Pantry Staples",
    description: "Essential ingredients for mindful, wholesome cooking.",
    shopifyQuery: "tag:pantry-staples",
    heroGradient: "from-gold-lighter to-champagne",
    icon: "🫙",
  },
  {
    slug: "superfoods",
    label: "Superfoods",
    description: "Nature's most potent foods, straight to your table.",
    shopifyQuery: "tag:superfoods",
    heroGradient: "from-emerald-lighter to-accent",
    icon: "🌿",
  },
  {
    slug: "beverages",
    label: "Beverages",
    description: "Clean drinks — from functional teas to nourishing tonics.",
    shopifyQuery: "tag:beverages",
    heroGradient: "from-accent to-emerald-lighter",
    icon: "🍵",
  },
  {
    slug: "supplements",
    label: "Supplements",
    description: "Pure, lab-tested nutrition to power your wellness journey.",
    shopifyQuery: "tag:supplements",
    heroGradient: "from-emerald-lighter to-gold-lighter",
    icon: "💊",
  },
  {
    slug: "kid-friendly",
    label: "Kid Friendly",
    description: "Wholesome products your children will actually love.",
    shopifyQuery: "tag:kid-friendly",
    heroGradient: "from-gold-lighter to-emerald-lighter",
    icon: "🧒",
  },
  {
    slug: "breakfast",
    label: "Breakfast",
    description: "Start your day right with clean, energising breakfast picks.",
    shopifyQuery: "tag:breakfast",
    heroGradient: "from-gold-lighter to-champagne",
    icon: "🌅",
  },
  {
    slug: "baking",
    label: "Baking",
    description: "Clean baking essentials for healthier homemade treats.",
    shopifyQuery: "tag:baking",
    heroGradient: "from-champagne to-gold-lighter",
    icon: "🍞",
  },
];

export const FILTER_OPTIONS = [
  { key: "low-sugar", label: "Low Sugar" },
  { key: "high-fiber", label: "High Fiber" },
  { key: "gut-friendly", label: "Gut Friendly" },
  { key: "high-protein", label: "High Protein" },
  { key: "gluten-free", label: "Gluten Free" },
  { key: "vegan", label: "Vegan" },
  { key: "organic", label: "Organic" },
  { key: "keto-friendly", label: "Keto Friendly" },
];

export const SORT_OPTIONS = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "title-asc", label: "Name: A–Z" },
  { key: "title-desc", label: "Name: Z–A" },
];

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
