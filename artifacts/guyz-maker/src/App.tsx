import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { setBaseUrl } from "@workspace/api-client-react";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "@/pages/not-found";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ApiAuthConfig } from "@/components/ApiAuthConfig";
import SEO from "@/components/SEO";

// Configurer l'API base URL
setBaseUrl("http://localhost:3000");

// Pages
import Home from "@/pages/home";
import Projects from "@/pages/projects";
import Services from "@/pages/services";
import Blog from "@/pages/blog";
import ArticlePage from "@/pages/blog/[id]";
import About from "@/pages/about";
import Contact from "@/pages/contact";

// Admin Pages
import AdminDashboard from "@/pages/admin/dashboard";
import AdminArticles from "@/pages/admin/articles";
import ArticleForm from "@/pages/admin/articles/form";
import AdminProjects from "@/pages/admin/projects";
import ProjectForm from "@/pages/admin/projects/form";
import AdminAnalytics from "@/pages/admin/analytics";
import AdminLogin from "@/pages/admin/login";
import ProtectedRoute from "@/components/ProtectedRoute";

// Hooks
import { usePageTracking } from "@/hooks/use-page-tracking";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/services" component={Services} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={ArticlePage} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin">
        {() => (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/articles">
        {() => (
          <ProtectedRoute>
            <AdminArticles />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/articles/new">
        {() => (
          <ProtectedRoute>
            <ArticleForm />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/articles/:id/edit">
        {() => (
          <ProtectedRoute>
            <ArticleForm />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/projects">
        {() => (
          <ProtectedRoute>
            <AdminProjects />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/projects/new">
        {() => (
          <ProtectedRoute>
            <ProjectForm />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/projects/:id/edit">
        {() => (
          <ProtectedRoute>
            <ProjectForm />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/analytics">
        {() => (
          <ProtectedRoute>
            <AdminAnalytics />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function AppInner({ children }: { children: React.ReactNode }) {
  usePageTracking();
  return <>{children}</>;
}

function MainLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isAdmin = location.startsWith('/admin');
  
  if (isAdmin) {
    return (
      <>
        <SEO 
          title="Admin - Guyz Maker"
          description="Panneau d'administration Guyz Maker"
          noIndex 
        />
        {children}
      </>
    );
  }
  
  return (
    <>
      <SEO />
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
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ApiAuthConfig />
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AppInner>
              <div className="min-h-[100dvh] flex flex-col bg-background text-foreground bg-circuit-pattern">
                <MainLayout>
                  <Router />
                </MainLayout>
              </div>
            </AppInner>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
