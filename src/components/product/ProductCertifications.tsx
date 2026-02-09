import { ShieldCheck, FileCheck, Award, FlaskConical } from "lucide-react";

interface Certification {
  icon: "shield" | "file" | "award" | "lab";
  title: string;
  description: string;
}

interface ProductCertificationsProps {
  certifications?: Certification[];
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
    description: "Meets all food safety standards set by the Food Safety and Standards Authority of India.",
  },
  {
    icon: "lab",
    title: "Lab Tested",
    description: "Every batch is tested for heavy metals, pesticides, and microbial contamination.",
  },
  {
    icon: "award",
    title: "No Artificial Additives",
    description: "Free from artificial colors, flavors, and preservatives.",
  },
  {
    icon: "file",
    title: "Transparent Labelling",
    description: "What you see is what you get — full ingredient disclosure on every pack.",
  },
];

const ProductCertifications = ({
  certifications = defaultCertifications,
}: ProductCertificationsProps) => {
  return (
    <section>
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Certifications & Lab Tests
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certifications.map((cert, i) => {
          const Icon = iconMap[cert.icon];
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
    </section>
  );
};

export default ProductCertifications;
