import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { X, Clock, AlertTriangle, Check, Calendar } from "lucide-react";

interface Destination {
  id: string;
  title: string;
  era: string;
  fullDescription: string;
  image: string;
  duration: string;
  danger: "low" | "medium" | "high";
  experiences: string[];
  precautions: string[];
  price: string;
}

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
}

export function DestinationModal({
  destination,
  onClose,
}: DestinationModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!destination) return null;

  const dangerColors = {
    low: "text-green-400",
    medium: "text-yellow-400",
    high: "text-red-400",
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>

          <div className="flex flex-col md:flex-row max-h-[90vh]">
            {/* Image Section */}
            <div className="relative w-full md:w-2/5 h-64 md:h-auto md:min-h-[600px]">
              <img
                src={destination.image}
                alt={destination.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card md:bg-gradient-to-t md:from-card md:via-transparent md:to-transparent" />
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto">
              <div className="mb-6">
                <span className="text-primary text-sm tracking-widest uppercase">
                  {destination.era}
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-foreground mt-2">
                  {destination.title}
                </h2>
              </div>

              {/* Info Badges */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{destination.duration}</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${dangerColors[destination.danger]}`}
                >
                  <AlertTriangle className="w-5 h-5" />
                  <span className="capitalize">
                    Risque{" "}
                    {destination.danger === "low"
                      ? "Faible"
                      : destination.danger === "medium"
                        ? "Modéré"
                        : "Élevé"}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-xl">
                <span className="text-muted-foreground text-sm">
                  À partir de
                </span>
                <div className="text-3xl font-serif text-primary">
                  {destination.price}
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-8">
                {destination.fullDescription}
              </p>

              {/* Experiences */}
              <div className="mb-8">
                <h3 className="text-lg font-serif text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Expériences Incluses
                </h3>
                <ul className="space-y-3">
                  {destination.experiences.map((exp, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Precautions */}
              <div className="mb-8">
                <h3 className="text-lg font-serif text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Précautions & Équipement
                </h3>
                <ul className="space-y-3">
                  {destination.precautions.map((prec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{prec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex gap-4">
                <Button
                  className="flex-1"
                  onClick={() => {
                    onClose();
                    document
                      .getElementById("booking")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Réserver ce Voyage
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Retour
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
