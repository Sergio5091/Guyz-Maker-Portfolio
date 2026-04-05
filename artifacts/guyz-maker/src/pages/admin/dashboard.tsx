import { useListArticles, useListProjects } from "@workspace/api-client-react";
import AdminLayout from "@/components/layout/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { FileText, Briefcase, Plus, TrendingUp, CheckCircle2, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function AdminDashboard() {
  const { data: articles, isLoading: loadingArticles } = useListArticles();
  const { data: projects, isLoading: loadingProjects } = useListProjects();

  const publishedArticles = articles?.filter(a => a.published) || [];
  const draftArticles = articles?.filter(a => !a.published) || [];
  const featuredProjects = projects?.filter(p => p.featured) || [];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your portfolio content.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/articles/new">
            <Button data-testid="btn-new-article" className="gap-2">
              <Plus className="w-4 h-4" />
              New Article
            </Button>
          </Link>
          <Link href="/admin/projects/new">
            <Button data-testid="btn-new-project" variant="secondary" className="gap-2 bg-white text-gray-900 border border-gray-200 hover:bg-gray-100">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Articles</CardTitle>
            <FileText className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            {loadingArticles ? <Skeleton className="h-8 w-16" /> : (
              <div className="text-3xl font-bold">{articles?.length || 0}</div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {publishedArticles.length} published, {draftArticles.length} drafts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Projects</CardTitle>
            <Briefcase className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            {loadingProjects ? <Skeleton className="h-8 w-16" /> : (
              <div className="text-3xl font-bold">{projects?.length || 0}</div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {featuredProjects.length} featured
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-orbitron">Recent Articles</h2>
            <Link href="/admin/articles">
              <Button variant="link" size="sm" className="text-primary h-auto p-0">View all</Button>
            </Link>
          </div>
          <Card>
            <div className="divide-y divide-gray-100">
              {loadingArticles ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4"><Skeleton className="h-12 w-full" /></div>
                ))
              ) : articles?.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No articles found.</div>
              ) : (
                articles?.slice(0, 5).map(article => (
                  <div key={article.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div>
                      <Link href={`/admin/articles/${article.id}/edit`} className="font-medium text-gray-900 hover:text-primary block">
                        {article.title}
                      </Link>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          {article.published ? <CheckCircle2 className="w-3 h-3 text-green-500" /> : <Clock className="w-3 h-3 text-amber-500" />}
                          {article.published ? "Published" : "Draft"}
                        </span>
                        <span>•</span>
                        <span>{format(new Date(article.createdAt), "MMM d, yyyy")}</span>
                        <span>•</span>
                        <span>{article.pillar}</span>
                      </div>
                    </div>
                    <Link href={`/admin/articles/${article.id}/edit`}>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-orbitron">Recent Projects</h2>
            <Link href="/admin/projects">
              <Button variant="link" size="sm" className="text-primary h-auto p-0">View all</Button>
            </Link>
          </div>
          <Card>
            <div className="divide-y divide-gray-100">
              {loadingProjects ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4"><Skeleton className="h-12 w-full" /></div>
                ))
              ) : projects?.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No projects found.</div>
              ) : (
                projects?.slice(0, 5).map(project => (
                  <div key={project.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div>
                      <Link href={`/admin/projects/${project.id}/edit`} className="font-medium text-gray-900 hover:text-primary block">
                        {project.title}
                      </Link>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        {project.featured && (
                          <Badge variant="secondary" className="text-[10px] h-4 px-1 py-0 bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                            Featured
                          </Badge>
                        )}
                        <span>{project.category}</span>
                        <span>•</span>
                        <span>{format(new Date(project.createdAt), "MMM d, yyyy")}</span>
                      </div>
                    </div>
                    <Link href={`/admin/projects/${project.id}/edit`}>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
