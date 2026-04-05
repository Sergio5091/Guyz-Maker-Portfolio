import { useEffect } from "react";
import { useLocation } from "wouter";

const PAGE_TITLES: Record<string, string> = {
  "/": "Accueil — Guyz Maker",
  "/blog": "Blog — Guyz Maker",
  "/projects": "Projets — Guyz Maker",
  "/services": "Services — Guyz Maker",
  "/about": "À Propos — Guyz Maker",
  "/contact": "Contact — Guyz Maker",
};

export function usePageTracking() {
  const [location] = useLocation();

  useEffect(() => {
    if (location.startsWith("/admin")) return;

    const title = PAGE_TITLES[location] ?? document.title ?? "Guyz Maker";

    fetch("/api/analytics/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: location, title, referrer: document.referrer || null }),
    }).catch(() => {});
  }, [location]);
}
