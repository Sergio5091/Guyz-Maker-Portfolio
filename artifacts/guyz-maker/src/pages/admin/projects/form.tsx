import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  useCreateProject, 
  useGetProject, 
  useUpdateProject, 
  getGetProjectQueryKey,
  getListProjectsQueryKey,
  useDeleteProject
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

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  slug: z.string().min(1, "Slug is required").max(100),
  description: z.string().min(1, "Description is required"),
  context: z.string().min(1, "Context is required"),
  problem: z.string().min(1, "Problem is required"),
  solution: z.string().min(1, "Solution is required"),
  techStack: z.string().min(1, "Tech stack is required"),
  results: z.string().min(1, "Results are required"),
  category: z.enum(["IoT", "Domotique", "Affichage", "SmartCity", "Formation"]),
  coverImage: z.string().optional().nullable(),
  metric: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  status: z.string().min(1, "Status is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProjectForm() {
  const params = useParams();
  const isEdit = !!params.id && params.id !== "new";
  const projectId = isEdit ? parseInt(params.id!) : undefined;
  
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data: project, isLoading: loadingProject } = useGetProject(projectId!, {
    query: { enabled: isEdit, queryKey: getGetProjectQueryKey(projectId!) }
  });

  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      context: "",
      problem: "",
      solution: "",
      techStack: "",
      results: "",
      category: "IoT",
      coverImage: "",
      metric: "",
      featured: false,
      status: "Completed",
    },
  });

  useEffect(() => {
    if (project) {
      form.reset({
        title: project.title,
        slug: project.slug,
        description: project.description,
        context: project.context,
        problem: project.problem,
        solution: project.solution,
        techStack: project.techStack,
        results: project.results,
        category: project.category,
        coverImage: project.coverImage || "",
        metric: project.metric || "",
        featured: project.featured,
        status: project.status,
      });
    }
  }, [project, form]);

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
      updateProject.mutate({
        id: projectId!,
        data: values
      }, {
        onSuccess: () => {
          toast({ title: "Project updated", description: "Your changes have been saved." });
          queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetProjectQueryKey(projectId!) });
          setLocation("/admin/projects");
        },
        onError: () => {
          toast({ title: "Error", description: "Could not save changes.", variant: "destructive" });
        }
      });
    } else {
      createProject.mutate({ data: values }, {
        onSuccess: () => {
          toast({ title: "Project created", description: "The new project has been published." });
          queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
          setLocation("/admin/projects");
        },
        onError: () => {
          toast({ title: "Error", description: "Could not create project.", variant: "destructive" });
        }
      });
    }
  };

  const handleDelete = () => {
    if (!projectId) return;
    deleteProject.mutate({ id: projectId }, {
      onSuccess: () => {
        toast({ title: "Project deleted" });
        queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
        setLocation("/admin/projects");
      },
      onError: () => {
        toast({ title: "Error", description: "Could not delete the project.", variant: "destructive" });
      }
    });
  };

  if (isEdit && loadingProject) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  const isPending = createProject.isPending || updateProject.isPending;

  return (
    <AdminLayout>
      <div className="mb-6">
        <Link href="/admin/projects" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Projects
        </Link>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-gray-900 tracking-tight">
            {isEdit ? "Edit Project" : "New Project"}
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
                          <Input placeholder="Project title" className="text-lg bg-gray-50/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Brief summary of the project" className="resize-none h-24 bg-gray-50/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="context"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Context</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Background context..." className="h-32 bg-gray-50/50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="problem"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Problem</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Problem solved..." className="h-32 bg-gray-50/50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="solution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Solution</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How you solved it..." className="h-32 bg-gray-50/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="results"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Results</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Outcomes and impact..." className="h-32 bg-gray-50/50" {...field} />
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
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-gray-50/30">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Featured</FormLabel>
                          <FormDescription>
                            Highlight on home page.
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
                          <Input placeholder="project-url-slug" className="bg-gray-50/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-50/50">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="IoT">IoT</SelectItem>
                            <SelectItem value="Domotique">Domotique</SelectItem>
                            <SelectItem value="Affichage">Affichage</SelectItem>
                            <SelectItem value="SmartCity">SmartCity</SelectItem>
                            <SelectItem value="Formation">Formation</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Completed, In Progress" className="bg-gray-50/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="techStack"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tech Stack</FormLabel>
                        <FormControl>
                          <Input placeholder="React, Node.js, etc." className="bg-gray-50/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coverImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." className="bg-gray-50/50" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="metric"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Metric</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. +50% efficiency" className="bg-gray-50/50" {...field} value={field.value || ""} />
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
              This action cannot be undone. This will permanently delete the project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteProject.isPending}
            >
              {deleteProject.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
