import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  useCreateArticle, 
  useGetArticle, 
  useUpdateArticle, 
  getGetArticleQueryKey,
  getListArticlesQueryKey,
  useDeleteArticle
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import ImageUpload from "@/components/ImageUpload";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  slug: z.string().min(1, "Slug is required").max(100),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  pillar: z.enum(["BUILD", "TEACH", "INSPIRE", "CONVERT"]),
  coverImage: z.string().optional().nullable(),
  published: z.boolean().default(false),
  readingTime: z.coerce.number().min(1).optional().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ArticleForm() {
  const params = useParams();
  const isEdit = !!params.id && params.id !== "new";
  const articleId = isEdit ? parseInt(params.id!) : undefined;
  
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data: article, isLoading: loadingArticle } = useGetArticle(articleId!, {
    query: { enabled: isEdit, queryKey: getGetArticleQueryKey(articleId!) }
  });

  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();
  const deleteArticle = useDeleteArticle();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      pillar: "BUILD",
      coverImage: "",
      published: false,
      readingTime: 5,
    },
  });

  useEffect(() => {
    if (article) {
      form.reset({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        pillar: article.pillar,
        coverImage: article.coverImage || "",
        published: article.published,
        readingTime: article.readingTime || 5,
      });
    }
  }, [article, form]);

  const titleValue = form.watch("title");
  
  useEffect(() => {
    if (!isEdit && titleValue) {
      const slug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      form.setValue("slug", slug, { shouldValidate: true });
    }
  }, [titleValue, isEdit, form]);

  const onSubmit = (values: FormValues) => {
    if (isEdit) {
      updateArticle.mutate({
        id: articleId!,
        data: values
      }, {
        onSuccess: () => {
          toast({ title: "Article updated", description: "Your changes have been saved." });
          queryClient.invalidateQueries({ queryKey: getListArticlesQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetArticleQueryKey(articleId!) });
          setLocation("/admin/articles");
        },
        onError: () => {
          toast({ title: "Error", description: "Could not save changes.", variant: "destructive" });
        }
      });
    } else {
      createArticle.mutate({ data: values }, {
        onSuccess: () => {
          toast({ title: "Article created", description: "The new article has been published." });
          queryClient.invalidateQueries({ queryKey: getListArticlesQueryKey() });
          setLocation("/admin/articles");
        },
        onError: () => {
          toast({ title: "Error", description: "Could not create article.", variant: "destructive" });
        }
      });
    }
  };

  const handleDelete = () => {
    if (!articleId) return;
    deleteArticle.mutate({ id: articleId }, {
      onSuccess: () => {
        toast({ title: "Article deleted" });
        queryClient.invalidateQueries({ queryKey: getListArticlesQueryKey() });
        setLocation("/admin/articles");
      },
      onError: () => {
        toast({ title: "Error", description: "Could not delete the article.", variant: "destructive" });
      }
    });
  };

  if (isEdit && loadingArticle) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  const isPending = createArticle.isPending || updateArticle.isPending;

  return (
    <AdminLayout>
      <div className="mb-6">
        <Link href="/admin/articles" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Articles
        </Link>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-gray-900 tracking-tight">
            {isEdit ? "Edit Article" : "New Article"}
          </h1>
        </div>
        <div className="flex gap-3">
          {isEdit && (
            <Button variant="destructive" type="button" onClick={() => setDeleteOpen(true)} className="gap-2">
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          )}
          <Button 
            onClick={form.handleSubmit(onSubmit)} 
            disabled={isPending}
            className="gap-2"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            <Save className="w-4 h-4" />
            Save
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter article title" className="text-lg bg-gray-50/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Excerpt</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Brief summary of the article" className="resize-none h-24 bg-gray-50/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content (Markdown)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Write your article content here..." className="min-h-[400px] font-mono text-sm bg-gray-50/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-gray-50/30">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Published</FormLabel>
                          <FormDescription>
                            Make this article visible on the site.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="article-url-slug" className="bg-gray-50/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pillar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pillar</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-50/50">
                              <SelectValue placeholder="Select a pillar" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="BUILD">BUILD</SelectItem>
                            <SelectItem value="TEACH">TEACH</SelectItem>
                            <SelectItem value="INSPIRE">INSPIRE</SelectItem>
                            <SelectItem value="CONVERT">CONVERT</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coverImage"
                    render={({ field }) => (
                      <FormItem>
                        <ImageUpload
                          value={field.value || ""}
                          onChange={field.onChange}
                          className="space-y-2"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="readingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reading Time (minutes)</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} className="bg-gray-50/50" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the article.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteArticle.isPending}
            >
              {deleteArticle.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
