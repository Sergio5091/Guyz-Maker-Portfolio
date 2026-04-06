import { Link } from "wouter";
import { Linkedin, Youtube, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <img 
              src="/assets/blanc.svg" 
              alt="Guyz Maker" 
              className="h-20 w-auto"
            />
          </Link>
          <p className="text-background/70 text-sm max-w-xs">
            L'ingénierie au service de l'innovation : De l'idée au produit intelligent. Construit depuis Cotonou, Bénin.
          </p>
        </div>
        
        <div>
          <h3 className="font-orbitron font-bold mb-4 text-primary">Liens</h3>
          <ul className="space-y-2 text-sm text-background/80">
            <li><Link href="/projects" className="hover:text-primary transition-colors">Projets</Link></li>
            <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">À Propos</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-orbitron font-bold mb-4 text-primary">Contact</h3>
          <ul className="space-y-2 text-sm text-background/80">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Cotonou, Bénin
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> hello@guyzmaker.com
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-orbitron font-bold mb-4 text-primary">Signal du Maker</h3>
          <p className="text-sm text-background/80 mb-4">La newsletter tech du jeudi.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email" 
              className="bg-background/10 border border-background/20 text-background px-3 py-2 text-sm w-full focus:outline-none focus:border-primary"
            />
            <button className="bg-primary text-primary-foreground px-4 py-2 text-sm font-bold hover:bg-primary/90 transition-colors">
              Go
            </button>
          </div>
          <div className="flex gap-4 mt-6">
            <a href="#" className="text-background/80 hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></a>
            <a href="#" className="text-background/80 hover:text-primary transition-colors"><Youtube className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-background/20 text-xs text-background/50 flex justify-between items-center">
        <p>© {new Date().getFullYear()} Guyz Maker. Tous droits réservés.</p>
        <p className="font-mono">BUILD. TEACH. INSPIRE.</p>
      </div>
    </footer>
  );
}
