import { useState } from "react";
import { motion } from "framer-motion";
import { DestinationCard } from "./DestinationCard";
import { DestinationModal } from "./DestinationModal";
import { getAssetPath } from "@/lib/utils";

const destinations = [
  {
    id: "paris-1889",
    title: "Paris - 1889",
    era: "Belle Époque",
    description:
      "Vivez l'inauguration de la Tour Eiffel lors de l'Exposition Universelle. Rencontrez Gustave Eiffel et découvrez Paris à son apogée culturelle.",
    image: getAssetPath("/Paris 1889 16_9.png"),
    highlights: ["Tour Eiffel", "Exposition Universelle", "Belle Époque"],
    duration: "3-7 jours",
    danger: "low" as const,
    price: "12 500 €",
    fullDescription:
      "Plongez au cœur de Paris en 1889, une époque de révolution artistique et technologique. Assistez à l'inauguration de la Tour Eiffel, chef-d'œuvre d'ingénierie qui a défié tous les sceptiques. Flânez dans les allées de l'Exposition Universelle, admirez les impressionnistes et savourez la vie parisienne dans les cafés de Montmartre.",
    experiences: [
      "Visite guidée de la Tour Eiffel en construction",
      "Dîner au restaurant Le Procope avec les intellectuels de l'époque",
      "Promenade dans le Paris d'Haussmann",
      "Rencontre avec des artistes impressionnistes",
      "Soirée au Moulin Rouge",
    ],
    precautions: [
      "Vêtements d'époque fournis",
      "Guide temporel personnel",
      "Traducteur linguistique intégré",
      "Vaccination contre les maladies du XIXe siècle",
    ],
  },
  {
    id: "cretaceous",
    title: "Période Crétacé",
    era: "-66 millions d'années",
    description:
      "Explorez un monde dominé par les dinosaures. Observez des T-Rex, Tricératops et Ptéranodons dans leur habitat naturel.",
    image: getAssetPath("/Crétacé 16_9.png"),
    highlights: ["Dinosaures", "Jungle Primordiale", "Aventure Extrême"],
    duration: "1-3 jours",
    danger: "high" as const,
    price: "45 000 €",
    fullDescription:
      "Une aventure pour les plus téméraires. Voyagez 66 millions d'années dans le passé pour observer les créatures les plus impressionnantes ayant jamais foulé la Terre. Depuis des plateformes sécurisées et des véhicules blindés, découvrez les dinosaures dans leur environnement naturel.",
    experiences: [
      "Safari en véhicule blindé anti-dinosaures",
      "Observation de T-Rex depuis un bunker sécurisé",
      "Vol en drone au-dessus des troupeaux de Tricératops",
      "Campement dans une zone sécurisée",
      "Collecte de fossiles authentiques",
    ],
    precautions: [
      "Équipement de survie complet obligatoire",
      "Escorte de sécurité armée",
      "Balise de téléportation d'urgence",
      "Assurance voyage temporel premium requise",
      "Formation de survie de 2 jours avant le départ",
    ],
  },
  {
    id: "florence-1504",
    title: "Florence - 1504",
    era: "Renaissance",
    description:
      "Découvrez l'âge d'or de la Renaissance. Rencontrez Léonard de Vinci, Michel-Ange et admirez la création du David.",
    image: getAssetPath("/Florence 1504 16_9.png"),
    highlights: ["Léonard de Vinci", "Michel-Ange", "Art Renaissance"],
    duration: "5-10 jours",
    danger: "medium" as const,
    price: "18 900 €",
    fullDescription:
      "Florence en 1504 est le berceau de la Renaissance. C'est l'année où Michel-Ange dévoile son David, où Léonard de Vinci perfectionne la Joconde. Immergez-vous dans cette ville où l'art, la science et la philosophie convergent pour créer une révolution culturelle sans précédent.",
    experiences: [
      "Visite de l'atelier de Léonard de Vinci",
      "Inauguration du David de Michel-Ange",
      "Cours de peinture avec des maîtres de la Renaissance",
      "Banquet au Palazzo Vecchio avec les Médicis",
      "Exploration des inventions de Léonard",
    ],
    precautions: [
      "Vêtements de noble florentin fournis",
      "Cours accéléré d'italien médiéval",
      "Guide historique spécialisé",
      "Lettres de recommandation pour la cour des Médicis",
    ],
  },
];

export function Destinations() {
  const [selectedDestination, setSelectedDestination] = useState<
    (typeof destinations)[0] | null
  >(null);

  return (
    <section id="destinations" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm tracking-widest uppercase mb-4 block">
            Nos Destinations
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
            Choisissez Votre Époque
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Trois destinations uniques, trois époques légendaires. Chaque voyage
            est une expérience sur mesure, encadrée par nos experts en
            chronologie.
          </p>
        </motion.div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              {...destination}
              index={index}
              onSelect={() => setSelectedDestination(destination)}
            />
          ))}
        </div>
      </div>

      {/* Destination Modal */}
      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </section>
  );
}
