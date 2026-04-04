import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const pillars = ["TOUS", "BUILD", "TEACH", "INSPIRE", "CONVERT"];

const articles = [
  {
    id: 1,
    title: "Pourquoi l'Afrique doit concevoir son propre Hardware",
    pillar: "INSPIRE",
    date: "12 Oct 2023",
    excerpt: "La souveraineté technologique ne passe pas seulement par le logiciel. Il est temps de construire nos propres circuits imprimés.",
    img: "/images/gallery-1.png",
    featured: true
  },
  {
    id: 2,
    title: "Guide: Automatiser sa PME avec Make et Airtable",
    pillar: "CONVERT",
    date: "05 Nov 2023",
    excerpt: "Comment nous avons réduit le temps administratif d'une PME béninoise de 15h par semaine avec des outils NoCode.",
    img: "/images/gallery-3.png",
    featured: false
  },
  {
    id: 3,
    title: "ESP32 vs ESP8266: Lequel choisir pour vos projets IoT industriels ?",
    pillar: "BUILD",
    date: "28 Nov 2023",
    excerpt: "Une analyse comparative technique basée sur nos déploiements réels chez INOVA Makers.",
    img: "/images/gallery-2.png",
    featured: false
  },
  {
    id: 4,
    title: "Initier les jeunes au prototypage rapide avec le FabLab BLOLAB",
    pillar: "TEACH",
    date: "10 Dec 2023",
    excerpt: "Retour d'expérience sur nos ateliers de formation à l'impression 3D et l'électronique de base.",
    img: "/images/inova.png",
    featured: false
  },
  {
    id: 5,
    title: "Les défis du déploiement LoRaWAN en milieu urbain africain",
    pillar: "BUILD",
    date: "15 Jan 2024",
    excerpt: "Ce que nous avons appris en installant des capteurs environnementaux à Cotonou.",
    img: "/images/hero-bg.png",
    featured: false
  }
];

export default function Blog() {
  const featured = articles.find(a => a.featured);
  const rest = articles.filter(a => !a.featured);

  return (
    <div className="w-full pb-24 pt-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-orbitron font-black text-foreground mb-4 uppercase">
              Chroniques <br/><span className="text-primary">du Maker</span>
            </h1>
            <div className="w-24 h-1 bg-primary mb-6"></div>
            <p className="text-muted-foreground max-w-2xl font-mono">
              // Documentation publique, apprentissages techniques et visions sur la tech en Afrique.
            </p>
          </div>
          <div className="w-full md:w-auto relative">
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full md:w-64 bg-card border-2 border-border pl-10 pr-4 py-2 focus:outline-none focus:border-primary rounded-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Pillars Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {pillars.map((pillar) => (
            <Button
              key={pillar}
              variant="outline"
              className={`rounded-none font-bold text-xs tracking-wider uppercase border-border text-foreground hover:border-primary hover:text-primary ${pillar === 'TOUS' ? 'bg-primary/10 text-primary border-primary' : ''}`}
            >
              {pillar}
            </Button>
          ))}
        </div>

        {/* Featured Article */}
        {featured && (
          <div className="mb-16">
            <Link href={`/blog/${featured.id}`} className="group grid lg:grid-cols-2 gap-8 bg-card border border-border hover:border-primary transition-colors overflow-hidden">
              <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                <img src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4 font-mono text-sm">
                  <span className="bg-primary text-white font-bold px-2 py-1 uppercase">{featured.pillar}</span>
                  <span className="text-muted-foreground">{featured.date}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-orbitron font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  {featured.excerpt}
                </p>
                <div className="flex items-center text-primary font-bold uppercase tracking-wider text-sm mt-auto">
                  Lire l'article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Article Grid */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
            {rest.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${article.id}`} className="group flex flex-col h-full bg-card border border-border hover:border-primary transition-colors">
                  <div className="aspect-video overflow-hidden">
                    <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3 font-mono text-xs">
                      <span className="text-primary font-bold uppercase">{article.pillar}</span>
                      <span className="text-muted-foreground">{article.date}</span>
                    </div>
                    <h3 className="text-xl font-orbitron font-bold mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center text-foreground font-bold uppercase tracking-wider text-xs mt-auto">
                      Lire <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-primary text-primary-foreground p-8 border-t-4 border-foreground">
              <h3 className="font-orbitron font-bold text-2xl mb-2">Signal du Maker</h3>
              <p className="text-primary-foreground/80 text-sm mb-6">
                Recevez mes notes d'ingénierie, découvertes tech et coulisses de l'écosystème béninois chaque jeudi. Pas de spam, que du concret.
              </p>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="votre@email.com" 
                  className="w-full bg-primary-foreground/10 border border-primary-foreground/30 text-white placeholder:text-white/50 px-4 py-2 focus:outline-none focus:border-white rounded-none"
                  required
                />
                <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90 font-bold rounded-none uppercase tracking-wider">
                  S'abonner
                </Button>
              </form>
            </div>

            <div className="border border-border p-6 bg-card">
              <h3 className="font-orbitron font-bold text-lg mb-4 flex items-center">
                <span className="text-primary mr-2">/</span> Piliers
              </h3>
              <ul className="space-y-2 font-mono text-sm">
                <li className="flex justify-between items-center hover:text-primary cursor-pointer transition-colors">
                  <span>&gt; BUILD</span> <span className="text-muted-foreground">12</span>
                </li>
                <li className="flex justify-between items-center hover:text-primary cursor-pointer transition-colors">
                  <span>&gt; TEACH</span> <span className="text-muted-foreground">8</span>
                </li>
                <li className="flex justify-between items-center hover:text-primary cursor-pointer transition-colors">
                  <span>&gt; INSPIRE</span> <span className="text-muted-foreground">15</span>
                </li>
                <li className="flex justify-between items-center hover:text-primary cursor-pointer transition-colors">
                  <span>&gt; CONVERT</span> <span className="text-muted-foreground">6</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
