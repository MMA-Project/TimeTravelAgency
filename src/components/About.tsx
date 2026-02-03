import { motion } from "framer-motion";
import { Shield, Award, Users, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: "2,847", label: "Voyageurs satisfaits" },
  { icon: Clock, value: "15M", label: "Années traversées" },
  { icon: Shield, value: "100%", label: "Retours réussis" },
  { icon: Award, value: "12", label: "Prix d'excellence" },
];

const features = [
  {
    title: "Sécurité Maximale",
    description:
      "Nos protocoles de sécurité ont été développés avec les meilleurs physiciens quantiques pour garantir votre retour en toute sécurité.",
  },
  {
    title: "Guides Experts",
    description:
      "Chaque voyage est accompagné par un chrononaute certifié, expert de l'époque visitée et formé aux situations d'urgence temporelle.",
  },
  {
    title: "Expériences Sur Mesure",
    description:
      "Nous créons des itinéraires personnalisés selon vos centres d'intérêt : art, science, aventure ou découverte culturelle.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-background">
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
            Notre Agence
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
            Pionniers du Voyage Temporel
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Depuis 2024, TimeTravel Agency repousse les limites du possible en
            offrant des voyages sécurisés à travers les époques les plus
            fascinantes de l'histoire.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <div className="text-3xl md:text-4xl font-serif text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <span className="text-primary font-serif text-lg">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-serif text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
