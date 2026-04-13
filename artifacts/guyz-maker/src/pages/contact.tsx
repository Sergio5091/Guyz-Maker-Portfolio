import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { MapPin, Mail, Linkedin, Youtube, Clock, Send, Instagram, Twitter, Github, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  company: z.string().optional(),
  email: z.string().email({ message: "Adresse email invalide." }),
  type: z.string({ required_error: "Veuillez sélectionner un type de besoin." }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères." }),
});

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      type: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Dans une application réelle, vous enverriez ces données à un backend
    console.log(values);
    toast({
      title: "Message envoyé avec succès",
      description: "Nous vous recontacterons sous 48h ouvrées.",
      variant: "default",
    });
    form.reset();
  }

  return (
    <div className="w-full pb-24 pt-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-foreground mb-4 uppercase">
            Parlons de votre <span className="text-primary">Projet</span>
          </h1>
          <div className="w-24 h-1 bg-primary mb-6"></div>
          <p className="text-muted-foreground max-w-2xl font-mono">
            // Vous avez une idée d'objet connecté, besoin d'automatiser vos processus ou de domotiser vos locaux ? Initiez la transmission.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2 bg-card border border-border p-6 md:p-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-wider text-xs">Nom complet</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="rounded-none border-2 focus-visible:ring-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-wider text-xs">Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@entreprise.com" className="rounded-none border-2 focus-visible:ring-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-wider text-xs">Entreprise (Optionnel)</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Corp" className="rounded-none border-2 focus-visible:ring-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-wider text-xs">Type de besoin</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-none border-2 focus:ring-primary">
                              <SelectValue placeholder="Sélectionnez un type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-none">
                            <SelectItem value="iot">Conception & Prototypage IoT</SelectItem>
                            <SelectItem value="domotique">Domotique & Bâtiment</SelectItem>
                            <SelectItem value="growth">Automatisation & Growth</SelectItem>
                            <SelectItem value="formation">Formation & Ateliers</SelectItem>
                            <SelectItem value="autre">Autre demande</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold uppercase tracking-wider text-xs">Détails du projet</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez votre besoin, le contexte et vos objectifs..." 
                          className="min-h-[150px] rounded-none border-2 focus-visible:ring-primary resize-y" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full md:w-auto bg-primary text-white hover:bg-primary/90 rounded-none font-bold uppercase tracking-wider flex items-center">
                  Envoyer la transmission <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </div>

          {/* Info Side */}
          <div className="space-y-8">
            <div className="bg-foreground text-background p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              
              <h3 className="font-orbitron font-bold text-xl mb-6">Informations</h3>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-4 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-mono text-sm text-primary mb-1">Localisation</strong>
                    <span className="text-background/80">Laboratoire basé à Cotonou, Bénin.<br/>Déploiements internationaux.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-primary mr-4 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-mono text-sm text-primary mb-1">Réactivité</strong>
                    <span className="text-background/80">Première réponse garantie sous 48h ouvrées.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mr-4 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-mono text-sm text-primary mb-1">Contact Direct</strong>
                    <a href="mailto:hello@guyzmaker.com" className="text-background/80 hover:text-primary transition-colors">hello@guyzmaker.com</a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="border border-border p-8 bg-card">
              <h3 className="font-orbitron font-bold text-xl mb-6">Réseaux Sociaux</h3>
              <div className="grid grid-cols-2 gap-3">
                <a href="https://www.linkedin.com/in/guyzmaker/" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border border-border hover:border-primary hover:text-primary transition-colors group">
                  <Linkedin className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-bold">LinkedIn</span>
                </a>
                <a href="https://www.youtube.com/@guyzmaker" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border border-border hover:border-primary hover:text-primary transition-colors group">
                  <Youtube className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-bold">YouTube</span>
                </a>
                <a href="https://www.tiktok.com/@guyz.maker" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border border-border hover:border-primary hover:text-primary transition-colors group">
                  <svg className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.17-1.9 1.12-3.69 2.58-4.84 1.66-1.33 3.98-1.64 6.01-1.16.01 1.49-.01 2.98-.02 4.47-.63-.23-1.34-.32-1.99-.13-.65.19-1.22.64-1.56 1.23-.37.64-.45 1.42-.3 2.15.22.94.95 1.72 1.86 2.03.74.25 1.58.12 2.21-.38.5-.38.82-.96.93-1.59.06-.4.06-.81.07-1.22.01-3.54 0-7.09.01-10.63 0-.17 0-.34 0-.51 2.42-.01 4.84.01 7.26-.01z"/>
                  </svg>
                  <span className="font-bold">TikTok</span>
                </a>
                <a href="https://www.instagram.com/guyzmaker/" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border border-border hover:border-primary hover:text-primary transition-colors group">
                  <Instagram className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-bold">Instagram</span>
                </a>
                <a href="https://x.com/guyzmaker" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border border-border hover:border-primary hover:text-primary transition-colors group">
                  <Twitter className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-bold">X/Twitter</span>
                </a>
                <a href="https://github.com/GuyzMaker" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border border-border hover:border-primary hover:text-primary transition-colors group">
                  <Github className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-bold">GitHub</span>
                </a>
                <a href="https://www.facebook.com/guyzmakers" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border border-border hover:border-primary hover:text-primary transition-colors group">
                  <Facebook className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-bold">Facebook</span>
                </a>
                <a href="mailto:hello@guyzmaker.com" className="flex items-center p-3 border border-border hover:border-primary hover:text-primary transition-colors group">
                  <Mail className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-bold">Newsletter</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
