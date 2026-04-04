import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { MapPin, Mail, Linkedin, Youtube, Clock, Send } from "lucide-react";
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
              <div className="flex flex-col gap-4">
                <a href="#" className="flex items-center p-3 border border-border hover:border-primary hover:text-primary transition-colors group">
                  <Linkedin className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-bold">LinkedIn</span>
                </a>
                <a href="#" className="flex items-center p-3 border border-border hover:border-primary hover:text-primary transition-colors group">
                  <Youtube className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-bold">YouTube</span>
                </a>
                <a href="#" className="flex items-center p-3 border border-border hover:border-primary hover:text-primary transition-colors group">
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
