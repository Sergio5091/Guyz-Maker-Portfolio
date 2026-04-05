import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

// Pages
import Home from "@/pages/home";
import Projects from "@/pages/projects";
import Services from "@/pages/services";
import Blog from "@/pages/blog";
import About from "@/pages/about";
import Contact from "@/pages/contact";

// Admin Pages
import AdminDashboard from "@/pages/admin/dashboard";
import AdminArticles from "@/pages/admin/articles";
import ArticleForm from "@/pages/admin/articles/form";
import AdminProjects from "@/pages/admin/projects";
import ProjectForm from "@/pages/admin/projects/form";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/services" component={Services} />
      <Route path="/blog" component={Blog} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/articles" component={AdminArticles} />
      <Route path="/admin/articles/new" component={ArticleForm} />
      <Route path="/admin/articles/:id/edit" component={ArticleForm} />
      <Route path="/admin/projects" component={AdminProjects} />
      <Route path="/admin/projects/new" component={ProjectForm} />
      <Route path="/admin/projects/:id/edit" component={ProjectForm} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function MainLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isAdmin = location.startsWith('/admin');
  
  if (isAdmin) {
    return <>{children}</>;
  }
  
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="min-h-[100dvh] flex flex-col bg-background text-foreground bg-circuit-pattern">
            <MainLayout>
              <Router />
            </MainLayout>
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
