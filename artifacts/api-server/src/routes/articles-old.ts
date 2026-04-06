import { Router, type IRouter } from "express";
import {
  ListArticlesQueryParams,
  ListArticlesResponse,
  CreateArticleBody,
  GetArticleParams,
  GetArticleResponse,
  UpdateArticleParams,
  UpdateArticleBody,
  UpdateArticleResponse,
  DeleteArticleParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/articles", async (req, res): Promise<void> => {
  const query = ListArticlesQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  let dbQuery = db.select().from(articlesTable).$dynamic();

  if (query.data.pillar) {
    dbQuery = dbQuery.where(eq(articlesTable.pillar, query.data.pillar));
  }
  if (query.data.published !== undefined) {
    const isPublished = query.data.published === "true";
    dbQuery = dbQuery.where(eq(articlesTable.published, isPublished));
  }

  const articles = await dbQuery.orderBy(articlesTable.createdAt);
  res.json(ListArticlesResponse.parse(articles));
});

router.post("/articles", async (req, res): Promise<void> => {
  const parsed = CreateArticleBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [article] = await db
    .insert(articlesTable)
    .values(parsed.data)
    .returning();

  res.status(201).json(GetArticleResponse.parse(article));
});

router.get("/articles/:id", async (req, res): Promise<void> => {
  const params = GetArticleParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [article] = await db
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.id, params.data.id));

  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }

  res.json(GetArticleResponse.parse(article));
});

router.patch("/articles/:id", async (req, res): Promise<void> => {
  const params = UpdateArticleParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateArticleBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [article] = await db
    .update(articlesTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(articlesTable.id, params.data.id))
    .returning();

  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }

  res.json(UpdateArticleResponse.parse(article));
});

router.delete("/articles/:id", async (req, res): Promise<void> => {
  const params = DeleteArticleParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [article] = await db
    .delete(articlesTable)
    .where(eq(articlesTable.id, params.data.id))
    .returning();

  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
