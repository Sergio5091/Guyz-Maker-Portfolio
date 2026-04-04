import { motion } from "framer-motion";
import { Terminal, Lightbulb, Hammer, Rocket, Shield } from "lucide-react";
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

    </div>
  );
}
