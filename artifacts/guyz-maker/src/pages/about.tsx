import { motion } from "framer-motion";
import { Terminal, Lightbulb, Hammer, Rocket, Shield, Linkedin, Youtube, Instagram, Twitter, Github, Facebook } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="w-full pb-24">
      {/* Hero */}
      <section className="relative w-full pt-32 pb-24 bg-foreground overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.png" 
            alt="Maker Workshop" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 z-10 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-6 uppercase leading-tight">
                Je construis en public <br/>depuis le Bénin — <br/>
                <span className="text-primary">pour le monde entier.</span>
              </h1>
              <div className="w-24 h-1 bg-primary mb-8"></div>
              <p className="text-gray-300 text-lg md:text-xl font-mono mb-8 max-w-2xl">
                // Je suis un ingénieur IoT et entrepreneur technologique convaincu que l'Afrique ne doit plus seulement consommer la technologie, mais la concevoir.
              </p>
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-none font-bold uppercase tracking-wider" asChild>
                <Link href="/contact">Collaborons</Link>
              </Button>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="aspect-[3/4] border-l-4 border-b-4 border-primary p-2 bg-white/5 backdrop-blur-sm relative z-10">
                <img 
                  src="/images/portrait.png" 
                  alt="Guyz Maker" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-primary/50 -z-0"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-primary/50 -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-orbitron font-black text-foreground mb-4 uppercase">L'ADN DU MAKER</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { title: "BRUT", icon: Terminal, desc: "Focus sur la fonction avant le superflu." },
            { title: "ANCRÉ", icon: Hammer, desc: "Des solutions pour des problèmes locaux réels." },
            { title: "PÉDAGOGUE", icon: Lightbulb, desc: "Transmettre le savoir à chaque étape." },
            { title: "AMBITIEUX", icon: Rocket, desc: "Viser des standards internationaux." },
            { title: "FIABLE", icon: Shield, desc: "Du matériel robuste, fait pour durer." },
          ].map((value, i) => (
            <motion.div 
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border p-6 text-center hover:border-primary hover:-translate-y-1 transition-all group"
            >
              <value.icon className="h-8 w-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-orbitron font-bold text-lg mb-2">{value.title}</h3>
              <p className="text-xs text-muted-foreground">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-orbitron font-black text-foreground mb-16 flex items-center">
              <span className="text-primary mr-3">/</span> PARCOURS
            </h2>
            
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {[
                { year: "2016", role: "CTO, INOVA Display", desc: "Début de l'aventure dans la conception de systèmes d'affichage LED dynamiques." },
                { year: "2018", role: "Manager, BLOLAB", desc: "Direction du premier FabLab solidaire du Bénin. Formation de centaines de jeunes." },
                { year: "2021", role: "CEO, INOVA MakerSpace", desc: "Création de l'incubateur matériel pour structurer les projets hardware en Afrique de l'Ouest." },
                { year: "2024", role: "Lancement de Guyz Maker", desc: "Consolidation de l'expertise en un pôle technologique complet : IoT, Domotique et Automatisation." },
              ].map((item, i) => (
                <motion.div 
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-none border-2 border-primary bg-background text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold font-mono text-sm">
                    {i + 1}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-card border border-border group-hover:border-primary transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-xl">{item.role}</h3>
                      <span className="font-orbitron font-bold text-primary bg-primary/10 px-2 py-1 text-sm">{item.year}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack & Gallery */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-orbitron font-black text-foreground mb-8 flex items-center">
              <span className="text-primary mr-3">/</span> STACK TECHNIQUE
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-bold font-mono text-sm uppercase text-muted-foreground mb-4 border-b border-border pb-2">Hardware & Électronique</h3>
                <div className="flex flex-wrap gap-2">
                  {["Altium Designer", "KiCad", "Arduino", "ESP32", "Raspberry Pi", "LoRaWAN", "Impression 3D", "CNC"].map(tech => (
                    <span key={tech} className="bg-muted px-3 py-1 text-sm font-medium border border-border">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold font-mono text-sm uppercase text-muted-foreground mb-4 border-b border-border pb-2">Software & Firmware</h3>
                <div className="flex flex-wrap gap-2">
                  {["C/C++", "Python", "MicroPython", "JavaScript", "React", "Node.js", "MQTT", "REST APIs"].map(tech => (
                    <span key={tech} className="bg-muted px-3 py-1 text-sm font-medium border border-border">{tech}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold font-mono text-sm uppercase text-muted-foreground mb-4 border-b border-border pb-2">Automatisation & NoCode</h3>
                <div className="flex flex-wrap gap-2">
                  {["Make", "n8n", "Airtable", "Notion", "Home Assistant", "Retool"].map(tech => (
                    <span key={tech} className="bg-muted px-3 py-1 text-sm font-medium border border-border">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-orbitron font-black text-foreground mb-8 flex items-center">
              <span className="text-primary mr-3">/</span> LABORATOIRE
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-muted border border-border overflow-hidden">
                <img src="/images/gallery-1.png" alt="Prototype" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="aspect-square bg-muted border border-border overflow-hidden">
                <img src="/images/gallery-2.png" alt="PCB" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="col-span-2 aspect-[2/1] bg-muted border border-border overflow-hidden">
                <img src="/images/gallery-3.png" alt="Workspace" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-orbitron font-black text-foreground mb-12 text-center">
            Rejoignez l'<span className="text-primary">Aventure</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Suivez mon parcours quotidien, découvrez les coulisses des projets et rejoignez une communauté passionnée par l'innovation technologique en Afrique.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <a href="https://www.linkedin.com/in/guyzmaker/" target="_blank" rel="noopener noreferrer" className="group bg-card border-2 border-border p-6 hover:border-primary transition-all duration-300 text-center">
                <Linkedin className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-sm mb-1">LinkedIn</h3>
                <p className="text-xs text-muted-foreground">Réseau professionnel</p>
              </a>
              <a href="https://www.youtube.com/@guyzmaker" target="_blank" rel="noopener noreferrer" className="group bg-card border-2 border-border p-6 hover:border-primary transition-all duration-300 text-center">
                <Youtube className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-sm mb-1">YouTube</h3>
                <p className="text-xs text-muted-foreground">Tutoriels & Démos</p>
              </a>
              <a href="https://www.tiktok.com/@guyz.maker" target="_blank" rel="noopener noreferrer" className="group bg-card border-2 border-border p-6 hover:border-primary transition-all duration-300 text-center">
                <svg className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.17-1.9 1.12-3.69 2.58-4.84 1.66-1.33 3.98-1.64 6.01-1.16.01 1.49-.01 2.98-.02 4.47-.63-.23-1.34-.32-1.99-.13-.65.19-1.22.64-1.56 1.23-.37.64-.45 1.42-.3 2.15.22.94.95 1.72 1.86 2.03.74.25 1.58.12 2.21-.38.5-.38.82-.96.93-1.59.06-.4.06-.81.07-1.22.01-3.54 0-7.09.01-10.63 0-.17 0-.34 0-.51 2.42-.01 4.84.01 7.26-.01z"/>
                </svg>
                <h3 className="font-bold text-sm mb-1">TikTok</h3>
                <p className="text-xs text-muted-foreground">Démos rapides</p>
              </a>
              <a href="https://www.instagram.com/guyzmaker/" target="_blank" rel="noopener noreferrer" className="group bg-card border-2 border-border p-6 hover:border-primary transition-all duration-300 text-center">
                <Instagram className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-sm mb-1">Instagram</h3>
                <p className="text-xs text-muted-foreground">Coulisses & Photos</p>
              </a>
              <a href="https://x.com/guyzmaker" target="_blank" rel="noopener noreferrer" className="group bg-card border-2 border-border p-6 hover:border-primary transition-all duration-300 text-center">
                <Twitter className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-sm mb-1">X/Twitter</h3>
                <p className="text-xs text-muted-foreground">Actualités & Tech</p>
              </a>
              <a href="https://github.com/GuyzMaker" target="_blank" rel="noopener noreferrer" className="group bg-card border-2 border-border p-6 hover:border-primary transition-all duration-300 text-center">
                <Github className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-sm mb-1">GitHub</h3>
                <p className="text-xs text-muted-foreground">Code & Projets</p>
              </a>
              <a href="https://www.facebook.com/guyzmakers" target="_blank" rel="noopener noreferrer" className="group bg-card border-2 border-border p-6 hover:border-primary transition-all duration-300 text-center">
                <Facebook className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-sm mb-1">Facebook</h3>
                <p className="text-xs text-muted-foreground">Communauté</p>
              </a>
              <div className="group bg-card border-2 border-border p-6 hover:border-primary transition-all duration-300 text-center">
                <div className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform flex items-center justify-center">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-sm mb-1">Newsletter</h3>
                <p className="text-xs text-muted-foreground">Signal du Maker</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
