import { useState } from "react";
import { Link } from "wouter";
import { useListArticles, useDeleteArticle, getListArticlesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminArticles() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [pillarFilter, setPillarFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: articles, isLoading } = useListArticles();
  const deleteArticle = useDeleteArticle();

  const handleDelete = () => {
    if (!deleteId) return;
    deleteArticle.mutate({ id: deleteId }, {
      onSuccess: () => {
        toast({ title: "Article deleted", description: "The article has been permanently removed." });
        queryClient.invalidateQueries({ queryKey: getListArticlesQueryKey() });
        setDeleteId(null);
      },
      onError: () => {
        toast({ title: "Error", description: "Could not delete the article.", variant: "destructive" });
        setDeleteId(null);
      }
    });
  };

  const filteredArticles = Array.isArray(articles) ? articles.filter(a => {
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (pillarFilter !== "all" && a.pillar !== pillarFilter) return false;
    if (statusFilter !== "all") {
      const isPublished = statusFilter === "published";
      if (a.published !== isPublished) return false;
    }
    return true;
  }) : [];

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-gray-900 tracking-tight">Articles</h1>
          <p className="text-gray-500 mt-1">Manage your blog content and tutorials.</p>
        </div>
        <Link href="/admin/articles/new">
          <Button data-testid="btn-new-article" className="gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            New Article
          </Button>
        </Link>
      </div>

      <Card className="mb-8 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search articles..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-gray-50 border-gray-200"
            />
          </div>
          <Select value={pillarFilter} onValueChange={setPillarFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 border-gray-200">
              <SelectValue placeholder="All Pillars" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pillars</SelectItem>
              <SelectItem value="BUILD">BUILD</SelectItem>
              <SelectItem value="TEACH">TEACH</SelectItem>
              <SelectItem value="INSPIRE">INSPIRE</SelectItem>
              <SelectItem value="CONVERT">CONVERT</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 border-gray-200">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="overflow-hidden border-gray-200">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[40%] font-medium text-gray-500">Title</TableHead>
              <TableHead className="font-medium text-gray-500">Pillar</TableHead>
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
            ) : Array.isArray(filteredArticles) && filteredArticles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-gray-500">
                  No articles found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            ) : (
              Array.isArray(filteredArticles) && filteredArticles.map((article) => (
                <TableRow key={article.id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium text-gray-900">{article.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-[10px] bg-white">
                      {article.pillar}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {article.published ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Published</Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {article.createdAt ? format(new Date(article.createdAt), "MMM d, yyyy") : "No date"}
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
                        <Link href={`/admin/articles/${article.id}/edit`}>
                          <DropdownMenuItem className="cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem 
                          className="cursor-pointer text-red-600 focus:text-red-600"
                          onClick={() => setDeleteId(article.id)}
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
