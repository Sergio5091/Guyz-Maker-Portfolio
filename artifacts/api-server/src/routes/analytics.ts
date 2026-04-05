import { Router, type IRouter } from "express";
import { sql } from "drizzle-orm";
import { db, pageViewsTable } from "@workspace/db";

const router: IRouter = Router();

router.post("/analytics/pageview", async (req, res): Promise<void> => {
  const { path, title, referrer } = req.body;
  if (!path) {
    res.status(400).json({ error: "path is required" });
    return;
  }

  const bot = req.headers["user-agent"] || "";
  if (/bot|crawl|spider|slurp|facebot|ia_archiver/i.test(bot)) {
    res.status(201).json({ id: 0 });
    return;
  }

  const [row] = await db
    .insert(pageViewsTable)
    .values({ path, title: title ?? null, referrer: referrer ?? null })
    .returning({ id: pageViewsTable.id });

  res.status(201).json({ id: row.id });
});

router.get("/analytics/stats", async (req, res): Promise<void> => {
  const days = parseInt((req.query.days as string) || "30");

  const [totalRow] = await db.execute(
    sql`SELECT COUNT(*)::int AS total FROM page_views`
  ) as unknown as Array<{ total: number }>;

  const [uniqueRow] = await db.execute(
    sql`SELECT COUNT(DISTINCT path)::int AS unique_pages FROM page_views`
  ) as unknown as Array<{ unique_pages: number }>;

  const [todayRow] = await db.execute(
    sql`SELECT COUNT(*)::int AS today FROM page_views WHERE created_at::date = CURRENT_DATE`
  ) as unknown as Array<{ today: number }>;

  const [weekRow] = await db.execute(
    sql`SELECT COUNT(*)::int AS week FROM page_views WHERE created_at >= NOW() - INTERVAL '7 days'`
  ) as unknown as Array<{ week: number }>;

  const [topRow] = await db.execute(
    sql`SELECT path, COUNT(*)::int AS views FROM page_views GROUP BY path ORDER BY views DESC LIMIT 1`
  ) as unknown as Array<{ path: string; views: number } | undefined>;

  res.json({
    totalViews: totalRow?.total ?? 0,
    uniquePages: uniqueRow?.unique_pages ?? 0,
    todayViews: todayRow?.today ?? 0,
    weekViews: weekRow?.week ?? 0,
    topPage: topRow?.path ?? null,
  });
});

router.get("/analytics/pageviews", async (req, res): Promise<void> => {
  const days = parseInt((req.query.days as string) || "30");
  const limit = parseInt((req.query.limit as string) || "20");

  const rows = await db.execute(
    sql`SELECT path, MIN(title) AS title, COUNT(*)::int AS views, MAX(created_at) AS last_visit
        FROM page_views
        WHERE created_at >= NOW() - INTERVAL '1 day' * ${days}
        GROUP BY path
        ORDER BY views DESC
        LIMIT ${limit}`
  ) as unknown as Array<{ path: string; title: string | null; views: number; last_visit: string }>;

  res.json(rows.map(r => ({
    path: r.path,
    title: r.title ?? null,
    views: r.views,
    lastVisit: r.last_visit,
  })));
});

router.get("/analytics/daily", async (req, res): Promise<void> => {
  const days = parseInt((req.query.days as string) || "30");

  const rows = await db.execute(
    sql`SELECT TO_CHAR(created_at::date, 'YYYY-MM-DD') AS date, COUNT(*)::int AS views
        FROM page_views
        WHERE created_at >= NOW() - INTERVAL '1 day' * ${days}
        GROUP BY created_at::date
        ORDER BY created_at::date ASC`
  ) as unknown as Array<{ date: string; views: number }>;

  const filled: { date: string; views: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const found = rows.find(r => r.date === dateStr);
    filled.push({ date: dateStr, views: found?.views ?? 0 });
  }

  res.json(filled);
});

export default router;
