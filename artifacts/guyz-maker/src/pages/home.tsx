import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, LineChart, Home as HomeIcon } from "lucide-react";
import SEO from "@/components/SEO";

export default function Home() {
  return (
    <>
      <SEO 
        title="Guyz Maker - Ingénierie & Innovation | IoT, Domotique & Automatisation au Bénin"
        description="Expert en ingénierie IoT, domotique et automatisation au Bénin. De l'idée au produit intelligent. INOVA Makerspace, Optimatics, Aura Controle."
        keywords="Guyz Maker, ingénierie Bénin, IoT, domotique, automatisation, Cotonou, innovation, fabrication, makerspace, développement matériel, smart home"
      />
      <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-center bg-foreground overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.png" 
            alt="Maker Workshop" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-orbitron font-black leading-tight">
              L'ingénierie au service de l'innovation : <br/>
              <span className="text-primary">De l'idée au produit intelligent.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-lg font-mono">
              // IoT Developer & Tech Entrepreneur basé au Bénin. Construire la Deep Tech pour l'Afrique et le monde.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-none" asChild>
                <Link href="/projects">Voir les projets</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-none" asChild>
                <Link href="/contact">Démarrer un projet</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex justify-end"
          >
            <div className="relative w-full max-w-md aspect-[3/4] border-l-4 border-b-4 border-primary p-2 bg-foreground/50 backdrop-blur-sm">
              <img 
                src="/images/portrait.png" 
                alt="Guyz Maker Portrait" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credibility Bar */}
      <div className="bg-primary text-primary-foreground py-4 border-y border-primary/50 overflow-hidden relative">
        <motion.div 
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap font-mono text-sm md:text-base tracking-widest uppercase font-bold"
        >
          <span className="mx-8">+10 ANS D'EXPÉRIENCE</span> • 
          <span className="mx-8">BÉNIN & INTERNATIONAL</span> • 
          <span className="mx-8">IOT</span> • 
          <span className="mx-8">DOMOTIQUE</span> • 
          <span className="mx-8">SMART CITY</span> •
          <span className="mx-8">+10 ANS D'EXPÉRIENCE</span> • 
          <span className="mx-8">BÉNIN & INTERNATIONAL</span> • 
          <span className="mx-8">IOT</span> • 
          <span className="mx-8">DOMOTIQUE</span> • 
          <span className="mx-8">SMART CITY</span>
        </motion.div>
      </div>

      {/* Expertise Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-orbitron font-black text-foreground mb-4">PÔLES D'EXPERTISE</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "INOVA Makers", icon: Cpu, desc: "Conseil, prototypage IoT et fabrication numérique. Transformer l'idée en matériel fonctionnel." },
            { title: "Optimatics", icon: LineChart, desc: "Growth Hacking, IA & acquisition. Systèmes numériques pour la croissance et l'automatisation." },
            { title: "Aura Controle", icon: HomeIcon, desc: "Domotique & bâtiment intelligent. L'intégration de la technologie dans l'espace de vie." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="rounded-none border-2 border-border hover:border-primary transition-colors h-full bg-card hover:bg-muted/10 group">
                <CardContent className="p-8">
                  <item.icon className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="font-orbitron font-bold text-xl mb-4">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-orbitron font-black mb-4">PROJETS PHARES</h2>
              <div className="w-24 h-1 bg-primary"></div>
            </div>
            <Link href="/projects" className="hidden md:flex items-center text-primary font-bold hover:underline">
              Tous les projets <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "LuxPulse", img: "/images/luxpulse.png", metrics: "Systèmes d'affichage LED dynamiques IoT" },
              { name: "Aura Controle", img: "/images/aura-controle.png", metrics: "Installation domotique complète" },
              { name: "INOVA MakerSpace", img: "/images/inova.png", metrics: "Incubateur IoT & formation" }
            ].map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer block"
              >
                <div className="relative aspect-video overflow-hidden border border-background/20 mb-4">
                  <img src={project.img} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-primary text-white font-bold px-4 py-2 uppercase tracking-wider text-sm">Découvrir</span>
                  </div>
                </div>
                <h3 className="font-orbitron font-bold text-xl mb-2">{project.name}</h3>
                <p className="text-background/60 font-mono text-sm">{project.metrics}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="w-full border-background/20 text-background hover:bg-background/10 rounded-none" asChild>
              <Link href="/projects">Tous les projets</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-3xl font-orbitron font-black text-foreground mb-4">SIGNAL DU MAKER</h2>
        <p className="text-muted-foreground mb-8">La newsletter tech du jeudi. Coulisses, apprentissages, et ressources pour construire en public.</p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="votre@email.com" 
            className="flex-1 bg-card border-2 border-border px-4 py-3 focus:outline-none focus:border-primary rounded-none"
            required
          />
          <Button type="submit" size="lg" className="bg-primary text-white rounded-none font-bold">
            S'abonner
          </Button>
        </form>
      </section>
      </div>
    </>
  );
}
