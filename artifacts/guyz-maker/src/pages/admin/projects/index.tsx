import { useState } from "react";
import { Link } from "wouter";
import { useListProjects, useDeleteProject, getListProjectsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Star } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminProjects() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [featuredFilter, setFeaturedFilter] = useState<string>("all");
  
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: projects, isLoading } = useListProjects();
  const deleteProject = useDeleteProject();

  const handleDelete = () => {
    if (!deleteId) return;
    deleteProject.mutate({ id: deleteId }, {
      onSuccess: () => {
        toast({ title: "Project deleted", description: "The project has been permanently removed." });
        queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
        setDeleteId(null);
      },
      onError: () => {
        toast({ title: "Error", description: "Could not delete the project.", variant: "destructive" });
        setDeleteId(null);
      }
    });
  };

  const filteredProjects = projects?.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
    if (featuredFilter !== "all") {
      const isFeatured = featuredFilter === "featured";
      if (p.featured !== isFeatured) return false;
    }
    return true;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-gray-900 tracking-tight">Projects</h1>
          <p className="text-gray-500 mt-1">Manage your portfolio showcase items.</p>
        </div>
        <Link href="/admin/projects/new">
          <Button data-testid="btn-new-project" className="gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </Link>
      </div>

      <Card className="mb-8 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search projects..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-gray-50 border-gray-200"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 border-gray-200">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="IoT">IoT</SelectItem>
              <SelectItem value="Domotique">Domotique</SelectItem>
              <SelectItem value="Affichage">Affichage</SelectItem>
              <SelectItem value="SmartCity">SmartCity</SelectItem>
              <SelectItem value="Formation">Formation</SelectItem>
            </SelectContent>
          </Select>
          <Select value={featuredFilter} onValueChange={setFeaturedFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 border-gray-200">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="overflow-hidden border-gray-200">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[40%] font-medium text-gray-500">Title</TableHead>
              <TableHead className="font-medium text-gray-500">Category</TableHead>
              <TableHead className="font-medium text-gray-500">Status</TableHead>
              <TableHead className="font-medium text-gray-500">Date</TableHead>
              <TableHead className="text-right font-medium text-gray-500">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : filteredProjects?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-gray-500">
                  No projects found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects?.map((project) => (
                <TableRow key={project.id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      {project.title}
                      {project.featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-[10px] bg-white">
                      {project.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{project.status}</span>
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {format(new Date(project.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <Link href={`/admin/projects/${project.id}/edit`}>
                          <DropdownMenuItem className="cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem 
                          className="cursor-pointer text-red-600 focus:text-red-600"
                          onClick={() => setDeleteId(project.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
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
