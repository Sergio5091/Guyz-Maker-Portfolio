import { motion } from "framer-motion";
import { ArrowRight, Cpu, LineChart, Home, Code, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const processSteps = [
  { id: "01", title: "Brief & Cadrage", desc: "Compréhension du besoin, analyse de faisabilité technique et définition du cahier des charges." },
  { id: "02", title: "Prototypage", desc: "Conception du POC (Proof of Concept), itérations matérielles et logicielles, tests en conditions réelles." },
  { id: "03", title: "Déploiement", desc: "Production, installation sur site, formation des équipes et maintenance continue." }
];

export default function Services() {
  return (
    <div className="w-full pb-24 pt-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-foreground mb-4 uppercase">
            Services & <span className="text-primary">Expertises</span>
          </h1>
          <div className="w-24 h-1 bg-primary mb-6"></div>
          <p className="text-muted-foreground max-w-2xl font-mono">
            // Des solutions technologiques complètes. De la conception électronique à l'automatisation logicielle.
          </p>
        </div>

        {/* Process */}
        <div className="mb-24">
          <h2 className="text-2xl font-orbitron font-bold mb-8 flex items-center">
            <span className="text-primary mr-3 text-3xl">/</span> Méthodologie
          </h2>
          <div className="grid md:grid-cols-3 gap-4 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-border -z-10 -translate-y-1/2"></div>
            {processSteps.map((step, i) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-card border-2 border-border p-6 relative group hover:border-primary transition-colors"
              >
                <div className="w-12 h-12 bg-background border-2 border-primary text-primary flex items-center justify-center font-orbitron font-bold text-xl mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  {step.id}
                </div>
                <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Poles */}
        <div className="space-y-24">
          {/* INOVA Makers */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-4 bg-primary/10 text-primary mb-6">
                <Cpu className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-orbitron font-black mb-4">INOVA Makers</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Laboratoire de conception et prototypage IoT. Nous transformons vos idées en matériel fonctionnel prêt pour le déploiement.
              </p>
              <ul className="space-y-3 mb-8">
                {["Conception de circuits imprimés (PCB)", "Prototypage rapide & Impression 3D", "Développement firmware (C/C++, Python)", "Intégration de capteurs industriels"].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="rounded-none bg-foreground text-background hover:bg-primary hover:text-white font-bold" asChild>
                <Link href="/contact">Demander un devis</Link>
              </Button>
            </div>
            <div className="bg-muted aspect-square max-h-[400px] border border-border p-2">
              <img src="/images/gallery-2.png" alt="INOVA Makers Prototyping" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>

          {/* Optimatics */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-muted aspect-square max-h-[400px] border border-border p-2 order-2 lg:order-1">
              <img src="/images/gallery-3.png" alt="Optimatics Digital" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center p-4 bg-primary/10 text-primary mb-6">
                <LineChart className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-orbitron font-black mb-4">Optimatics</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Accélération digitale, automatisation des processus et Growth Hacking. Des systèmes logiciels pour scaler votre activité.
              </p>
              <ul className="space-y-3 mb-8">
                {["Automatisation NoCode (Make, n8n)", "Création d'outils internes (Airtable, Retool)", "Stratégies d'acquisition B2B", "Déploiement d'agents IA"].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="rounded-none bg-foreground text-background hover:bg-primary hover:text-white font-bold" asChild>
                <Link href="/contact">Optimiser vos processus</Link>
              </Button>
            </div>
          </div>

          {/* Aura Controle */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-4 bg-primary/10 text-primary mb-6">
                <Home className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-orbitron font-black mb-4">Aura Controle</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Solutions domotiques pour bâtiments intelligents. Sécurité, confort et efficacité énergétique pour les professionnels et particuliers.
              </p>
              <ul className="space-y-3 mb-8">
                {["Installation domotique complète", "Gestion intelligente de l'énergie", "Contrôle d'accès et sécurité", "Interfaces de contrôle sur-mesure"].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="rounded-none bg-foreground text-background hover:bg-primary hover:text-white font-bold" asChild>
                <Link href="/contact">Domotiser vos locaux</Link>
              </Button>
            </div>
            <div className="bg-muted aspect-square max-h-[400px] border border-border p-2">
              <img src="/images/aura-controle.png" alt="Aura Controle" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
        </div>

        {/* Formation Section */}
        <div className="mt-24 bg-foreground text-background p-8 md:p-16 border-l-4 border-primary">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Code className="h-10 w-10 text-primary mb-6" />
              <h2 className="text-3xl font-orbitron font-black mb-4 uppercase">Formation NoCode & Tech</h2>
              <p className="text-background/70 mb-6">
                Transférer les compétences pour l'autonomie technologique. Formations pratiques sur l'automatisation, Airtable, Notion et le développement matériel.
              </p>
              <ul className="space-y-2 mb-8 font-mono text-sm text-primary">
                <li>&gt; Ateliers en entreprise</li>
                <li>&gt; Coaching individuel</li>
                <li>&gt; Bootcamp intensif</li>
              </ul>
              <Button className="rounded-none bg-primary text-white hover:bg-primary/90 font-bold" asChild>
                <Link href="/contact">Voir les programmes</Link>
              </Button>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/10 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-3xl font-orbitron font-bold text-primary mb-2">+200</span>
                  <span className="text-sm font-mono">Personnes formées</span>
                </div>
                <div className="bg-background/10 p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-3xl font-orbitron font-bold text-primary mb-2">15</span>
                  <span className="text-sm font-mono">Entreprises accompagnées</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
