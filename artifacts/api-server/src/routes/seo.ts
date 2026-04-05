import { Router, type IRouter } from "express";
import { db, articlesTable, projectsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const SITE_URL = "https://guyz-maker.replit.app";

router.get("/sitemap.xml", async (req, res): Promise<void> => {
  const articles = await db
    .select({ slug: articlesTable.slug, updatedAt: articlesTable.updatedAt })
    .from(articlesTable)
    .where(eq(articlesTable.published, true));

  const projects = await db
    .select({ slug: projectsTable.slug, updatedAt: projectsTable.updatedAt })
    .from(projectsTable);

  const staticPages = [
    { loc: "/", priority: "1.0", changefreq: "weekly" },
    { loc: "/blog", priority: "0.9", changefreq: "daily" },
    { loc: "/projects", priority: "0.8", changefreq: "weekly" },
    { loc: "/services", priority: "0.8", changefreq: "monthly" },
    { loc: "/about", priority: "0.7", changefreq: "monthly" },
    { loc: "/contact", priority: "0.6", changefreq: "monthly" },
  ];

  const urls = [
    ...staticPages.map(p => `
  <url>
    <loc>${SITE_URL}${p.loc}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`),
    ...articles.map(a => `
  <url>
    <loc>${SITE_URL}/blog/${a.slug}</loc>
    <lastmod>${new Date(a.updatedAt).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`),
    ...projects.map(p => `
  <url>
    <loc>${SITE_URL}/projects/${p.slug}</loc>
    <lastmod>${new Date(p.updatedAt).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.send(xml);
});

router.get("/robots.txt", (_req, res): void => {
  res.setHeader("Content-Type", "text/plain");
  res.send(`User-agent: *
Allow: /

Sitemap: ${SITE_URL}/api/sitemap.xml`);
});

export default router;
