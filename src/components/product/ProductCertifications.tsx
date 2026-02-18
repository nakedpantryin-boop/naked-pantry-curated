import { ShieldCheck, FileCheck, Award, FlaskConical } from "lucide-react";

interface Certification {
  icon: "shield" | "file" | "award" | "lab";
  title: string;
  description: string;
}

interface ProductCertificationsProps {
  /** Pass raw JSON string from the `naked_pantry.certifications` metafield.
   *  Expected shape: Certification[]
   *  Falls back to defaultCertifications when absent or unparseable. */
  metafieldJson?: string;
}

const iconMap = {
  shield: ShieldCheck,
  file: FileCheck,
  award: Award,
  lab: FlaskConical,
};

const defaultCertifications: Certification[] = [
  {
    icon: "shield",
    title: "FSSAI Certified",
    description:
      "Meets all food safety standards set by the Food Safety and Standards Authority of India.",
  },
  {
    icon: "lab",
    title: "Lab Tested",
    description:
      "Every batch is tested for heavy metals, pesticides, and microbial contamination.",
  },
  {
    icon: "award",
    title: "No Artificial Additives",
    description: "Free from artificial colors, flavors, and preservatives.",
  },
  {
    icon: "file",
    title: "Transparent Labelling",
    description:
      "What you see is what you get — full ingredient disclosure on every pack.",
  },
];

function parseCertifications(json?: string): Certification[] {
  if (!json) return defaultCertifications;
  try {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed as Certification[];
    return defaultCertifications;
  } catch {
    return defaultCertifications;
  }
}

const ProductCertifications = ({ metafieldJson }: ProductCertificationsProps) => {
  const certifications = parseCertifications(metafieldJson);

  return (
    <section>
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Certifications & Lab Tests
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certifications.map((cert, i) => {
          const Icon = iconMap[cert.icon] ?? ShieldCheck;
          return (
            <div
              key={i}
              className="flex gap-4 p-5 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
            >
              <div className="p-2.5 bg-gold-lighter rounded-xl h-fit">
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  {cert.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Metafield setup hint — only visible in dev */}
      {!metafieldJson && import.meta.env.DEV && (
        <p className="mt-4 text-xs text-muted-foreground/60 italic">
          Tip: Add a <code>naked_pantry.certifications</code> metafield (JSON) to
          this product in Shopify admin to customise these certifications per product.
        </p>
      )}
    </section>
  );
};

export default ProductCertifications;
