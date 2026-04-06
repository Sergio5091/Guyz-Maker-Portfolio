import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useListArticles } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";

const pillars = ["TOUS", "BUILD", "TEACH", "INSPIRE", "CONVERT"];

export default function Blog() {
  const { data: articles, isLoading } = useListArticles();
  const [selectedPillar, setSelectedPillar] = useState("TOUS");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter only published articles
  const publishedArticles = Array.isArray(articles) ? articles.filter(article => article.published) : [];
  
  // Apply filters
  const filteredArticles = publishedArticles.filter(article => {
    const matchesPillar = selectedPillar === "TOUS" || article.pillar === selectedPillar;
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPillar && matchesSearch;
  });
  
  // Take the most recent article as featured, or first one with coverImage from filtered results
  const featured = filteredArticles.find(a => a.coverImage) || filteredArticles[0];
  const rest = filteredArticles.filter(a => a.id !== featured?.id);

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              onClick={() => setSelectedPillar(pillar)}
              className={`rounded-none font-bold text-xs tracking-wider uppercase border-border text-foreground hover:border-primary hover:text-primary ${selectedPillar === pillar ? 'bg-primary/10 text-primary border-primary' : ''}`}
            >
              {pillar}
            </Button>
          ))}
        </div>

        {/* Featured Article */}
        {isLoading ? (
          <Skeleton className="mb-16 h-96 w-full" />
        ) : featured ? (
          <div className="mb-16">
            <Link href={`/blog/${featured.id}`} className="group grid lg:grid-cols-2 gap-8 bg-card border border-border hover:border-primary transition-colors overflow-hidden">
              <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                <img src={featured.coverImage || "/images/hero-bg.png"} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4 font-mono text-sm">
                  <span className="bg-primary text-white font-bold px-2 py-1 uppercase">{featured.pillar}</span>
                  <span className="text-muted-foreground">
                    {featured.createdAt ? format(new Date(featured.createdAt), "d MMM yyyy", { locale: fr }) : "Date inconnue"}
                  </span>
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
        ) : null}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Article Grid */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-80 w-full" />
              ))
            ) : filteredArticles.length === 0 ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-muted-foreground">Aucun article trouvé pour cette recherche ou ce filtre.</p>
              </div>
            ) : (
              rest.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/blog/${article.id}`} className="group flex flex-col h-full bg-card border border-border hover:border-primary transition-colors">
                    <div className="aspect-video overflow-hidden">
                      <img src={article.coverImage || "/images/hero-bg.png"} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3 font-mono text-xs">
                        <span className="text-primary font-bold uppercase">{article.pillar}</span>
                        <span className="text-muted-foreground">
                          {article.createdAt ? format(new Date(article.createdAt), "d MMM yyyy", { locale: fr }) : "Date inconnue"}
                        </span>
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
              ))
            )}
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
                <li 
                  className="flex justify-between items-center hover:text-primary cursor-pointer transition-colors"
                  onClick={() => setSelectedPillar("BUILD")}
                >
                  <span>&gt; BUILD</span> <span className="text-muted-foreground">{publishedArticles.filter(a => a.pillar === "BUILD").length}</span>
                </li>
                <li 
                  className="flex justify-between items-center hover:text-primary cursor-pointer transition-colors"
                  onClick={() => setSelectedPillar("TEACH")}
                >
                  <span>&gt; TEACH</span> <span className="text-muted-foreground">{publishedArticles.filter(a => a.pillar === "TEACH").length}</span>
                </li>
                <li 
                  className="flex justify-between items-center hover:text-primary cursor-pointer transition-colors"
                  onClick={() => setSelectedPillar("INSPIRE")}
                >
                  <span>&gt; INSPIRE</span> <span className="text-muted-foreground">{publishedArticles.filter(a => a.pillar === "INSPIRE").length}</span>
                </li>
                <li 
                  className="flex justify-between items-center hover:text-primary cursor-pointer transition-colors"
                  onClick={() => setSelectedPillar("CONVERT")}
                >
                  <span>&gt; CONVERT</span> <span className="text-muted-foreground">{publishedArticles.filter(a => a.pillar === "CONVERT").length}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
