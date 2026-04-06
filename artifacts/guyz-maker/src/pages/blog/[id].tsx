import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetArticle } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function ArticlePage({ params }: { params: { id: string } }) {
  const { data: article, isLoading } = useGetArticle(Number(params.id));

  if (isLoading) {
    return (
      <div className="w-full pb-24 pt-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-6 w-96 mt-4" />
          </div>
          <Skeleton className="h-96 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="w-full pb-24 pt-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-orbitron font-bold mb-4">Article non trouvé</h1>
          <p className="text-muted-foreground mb-8">Cet article n'existe pas ou a été supprimé.</p>
          <Link href="/blog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-24 pt-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au blog
          </Link>
          
          <div className="flex items-center gap-4 mb-4 font-mono text-sm">
            <span className="bg-primary text-white font-bold px-3 py-1 uppercase">
              {article.pillar}
            </span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {article.createdAt ? format(new Date(article.createdAt), "d MMMM yyyy", { locale: fr }) : "Date inconnue"}
            </div>
            {article.readingTime && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                {article.readingTime} min de lecture
              </div>
            )}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-foreground mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl">
            {article.excerpt}
          </p>
        </div>

        {/* Cover Image */}
        {article.coverImage && (
          <div className="mb-12">
            <motion.img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-auto rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            />
          </div>
        )}

        {/* Article Content */}
        <motion.div
          className="max-w-4xl mx-auto prose prose-lg prose-neutral dark:prose-invert"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div 
            dangerouslySetInnerHTML={{ __html: article.content }}
            className="text-foreground leading-relaxed"
          />
        </motion.div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour au blog
              </Button>
            </Link>
            
            <div className="text-sm text-muted-foreground">
              Publié le {article.createdAt ? format(new Date(article.createdAt), "d MMMM yyyy", { locale: fr }) : "date inconnue"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
