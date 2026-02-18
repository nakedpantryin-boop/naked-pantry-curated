import { Leaf, Heart, Sparkles } from "lucide-react";

interface NakedPantryTakeProps {
  /** Nutritionist's summary pulled from the `naked_pantry.nutritionist_summary` metafield */
  summary?: string;
  /** Key highlights pulled from the `naked_pantry.nutritionist_highlights` metafield (JSON array or newline-separated) */
  highlights?: string[];
}

const defaultSummary =
  "Our in-house nutritionist has evaluated this product for ingredient quality, nutritional balance, and clean-label standards. Here's what stands out.";

const defaultHighlights = [
  "No artificial preservatives or flavors",
  "Rich in plant-based protein and fiber",
  "Low glycemic index — suitable for mindful snacking",
  "Minimally processed with transparent sourcing",
];

const NakedPantryTake = ({
  summary = defaultSummary,
  highlights = defaultHighlights,
}: NakedPantryTakeProps) => {
  return (
    <section className="rounded-2xl border-2 border-emerald/20 bg-emerald-lighter/50 p-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 bg-emerald rounded-xl">
          <Leaf className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            The Naked Pantry's Take
          </h3>
          <p className="text-sm text-muted-foreground">
            Our Nutritionist's Evaluation
          </p>
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed mb-6">{summary}</p>

      <ul className="space-y-3">
        {highlights.map((highlight, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-0.5 flex-shrink-0">
              {i % 2 === 0 ? (
                <Heart className="w-4 h-4 text-emerald" />
              ) : (
                <Sparkles className="w-4 h-4 text-gold" />
              )}
            </span>
            <span className="text-foreground text-sm leading-relaxed">
              {highlight}
            </span>
          </li>
        ))}
      </ul>

      {/* Metafield setup hint — only visible in dev */}
      {summary === defaultSummary && import.meta.env.DEV && (
        <p className="mt-6 text-xs text-muted-foreground/60 italic">
          Tip: Add <code>naked_pantry.nutritionist_summary</code> (text) and{" "}
          <code>naked_pantry.nutritionist_highlights</code> (JSON array) metafields
          in Shopify admin to customise this section per product.
        </p>
      )}
    </section>
  );
};

export default NakedPantryTake;
