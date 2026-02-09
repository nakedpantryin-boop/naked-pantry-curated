import { Leaf, Heart, Sparkles } from "lucide-react";

interface NakedPantryTakeProps {
  /** Nutritionist's summary of the product */
  summary?: string;
  /** Key highlights from the nutritionist */
  highlights?: string[];
}

const NakedPantryTake = ({
  summary = "Our in-house nutritionist has evaluated this product for ingredient quality, nutritional balance, and clean-label standards. Here's what stands out.",
  highlights = [
    "No artificial preservatives or flavors",
    "Rich in plant-based protein and fiber",
    "Low glycemic index — suitable for mindful snacking",
    "Minimally processed with transparent sourcing",
  ],
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
    </section>
  );
};

export default NakedPantryTake;
