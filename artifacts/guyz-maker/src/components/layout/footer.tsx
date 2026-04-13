import { Link } from "wouter";
import { Linkedin, Youtube, Mail, MapPin, Instagram, Twitter, Github, Facebook } from "lucide-react";

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
          <div className="flex gap-3 mt-6">
            <a href="https://www.linkedin.com/in/guyzmaker/" target="_blank" rel="noopener noreferrer" className="text-background/80 hover:text-primary transition-colors" title="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://www.youtube.com/@guyzmaker" target="_blank" rel="noopener noreferrer" className="text-background/80 hover:text-primary transition-colors" title="YouTube">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="https://www.tiktok.com/@guyz.maker" target="_blank" rel="noopener noreferrer" className="text-background/80 hover:text-primary transition-colors" title="TikTok">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.17-1.9 1.12-3.69 2.58-4.84 1.66-1.33 3.98-1.64 6.01-1.16.01 1.49-.01 2.98-.02 4.47-.63-.23-1.34-.32-1.99-.13-.65.19-1.22.64-1.56 1.23-.37.64-.45 1.42-.3 2.15.22.94.95 1.72 1.86 2.03.74.25 1.58.12 2.21-.38.5-.38.82-.96.93-1.59.06-.4.06-.81.07-1.22.01-3.54 0-7.09.01-10.63 0-.17 0-.34 0-.51 2.42-.01 4.84.01 7.26-.01z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/guyzmaker/" target="_blank" rel="noopener noreferrer" className="text-background/80 hover:text-primary transition-colors" title="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://x.com/guyzmaker" target="_blank" rel="noopener noreferrer" className="text-background/80 hover:text-primary transition-colors" title="X/Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://github.com/GuyzMaker" target="_blank" rel="noopener noreferrer" className="text-background/80 hover:text-primary transition-colors" title="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.facebook.com/guyzmakers" target="_blank" rel="noopener noreferrer" className="text-background/80 hover:text-primary transition-colors" title="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
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
