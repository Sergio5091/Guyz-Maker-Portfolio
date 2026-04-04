import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: "luxpulse",
    name: "LuxPulse",
    category: "Affichage & LED",
    desc: "Systèmes d'affichage LED dynamiques IoT pour la communication d'entreprise et l'industrie. Composé de sDisplay, sTime, sNumber, et sLED.",
    img: "/images/luxpulse.png",
    metrics: ["+50 Déploiements", "100% Modulaire", "API Cloud"],
  },
  {
    id: "aura-controle",
    name: "Aura Controle",
    category: "Domotique",
    desc: "Installation domotique complète pour bâtiment intelligent. Gestion centralisée de l'éclairage, climatisation, sécurité et énergie.",
    img: "/images/aura-controle.png",
    metrics: ["-30% Énergie", "Contrôle Vocal", "App Mobile"],
  },
  {
    id: "inova-makerspace",
    name: "INOVA MakerSpace",
    category: "Formation",
    desc: "Incubateur IoT et espace de fabrication numérique pour former la prochaine génération de makers en Afrique.",
    img: "/images/inova.png",
    metrics: ["+200 Formés", "Imprimantes 3D", "Ateliers CNC"],
  },
  {
    id: "smart-city-cotonou",
    name: "Smart City Cotonou",
    category: "Smart City",
    desc: "Capteurs de qualité de l'air et gestion de l'éclairage public urbain connecté via réseau LoRaWAN.",
    img: "/images/hero-bg.png",
    metrics: ["15 Capteurs", "LoRaWAN", "Dashboard Temps Réel"],
  },
  {
    id: "agri-iot",
    name: "AgriTech Sens",
    category: "IoT",
    desc: "Système de surveillance de l'humidité des sols pour l'agriculture de précision avec alertes SMS.",
    img: "/images/gallery-1.png",
    metrics: ["Autonomie Solaire", "Alerte SMS", "Sondes Multiples"],
  }
];

const categories = ["Tous", "IoT", "Domotique", "Affichage & LED", "Smart City", "Formation"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredProjects = projects.filter(
    (p) => activeCategory === "Tous" || p.category === activeCategory
  );

  return (
    <div className="w-full pb-24 pt-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-foreground mb-4 uppercase">
            Projets <span className="text-primary">Réalisés</span>
          </h1>
          <div className="w-24 h-1 bg-primary mb-6"></div>
          <p className="text-muted-foreground max-w-2xl font-mono">
            // Exploration du portfolio. De la conception matérielle au déploiement logiciel. Des systèmes conçus pour fonctionner dans le monde réel.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-none font-bold text-sm ${
                activeCategory === cat ? "bg-primary text-white" : "border-border hover:border-primary/50 text-foreground"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col h-full bg-card border border-border hover:border-primary transition-colors"
              >
                <div className="relative aspect-video overflow-hidden border-b border-border">
                  <img 
                    src={project.img} 
                    alt={project.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
                    {project.category}
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="font-orbitron font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-1">
                    {project.desc}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-auto border-t border-border pt-4">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="text-xs font-mono text-foreground font-bold flex items-center before:content-['>'] before:text-primary before:mr-1">
                        {metric}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
