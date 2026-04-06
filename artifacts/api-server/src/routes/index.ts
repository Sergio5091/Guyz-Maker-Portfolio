import { Router, type IRouter, type Request, type Response } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
// import analyticsRouter from "./analytics";
import uploadRouter from "./upload";
import articlesRouter from "./articles";
// import projectsRouter from "./projects";
import { requireAuth, type AuthenticatedRequest } from "../middleware/auth.js";
// @ts-ignore
import mysql from "mysql2/promise";

const router: IRouter = Router();

// Configuration MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'guyz_maker_portfolio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool: mysql.Pool;

// Initialiser la connexion MySQL
async function initDB() {
  try {
    pool = mysql.createPool(dbConfig);
    // Test connexion
    const connection = await pool.getConnection();
    connection.release();
    // biome-ignore lint/suspicious/noConsoleLog: Connection success message
    console.log('✅ MySQL connected successfully');
  } catch (error) {
    // biome-ignore lint/suspicious/noConsoleLog: Error logging
    console.error('❌ MySQL connection failed:', error);
    throw error;
  }
}

// Initialiser au démarrage
initDB();

// Articles routes (direct implementation for now)
router.get("/articles", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM articles ORDER BY created_at DESC');
    
    // Transformer les données pour correspondre au frontend
    const articles = (rows as any[]).map(article => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      pillar: article.pillar,
      coverImage: article.cover_image ? 
        (article.cover_image.startsWith('http') ? article.cover_image : `http://localhost:3000${article.cover_image}`)
        : null,
      published: Boolean(article.published),
      readingTime: article.reading_time,
      createdAt: article.created_at,
      updatedAt: article.updated_at
    }));
    
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

router.get("/articles/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const [rows] = await pool.execute('SELECT * FROM articles WHERE id = ?', [id]);
    const article = (rows as any[])[0];
    
    if (!article) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
    
    // Transformer les données pour correspondre au frontend
    const normalizedArticle = {
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      pillar: article.pillar,
      coverImage: article.cover_image ? 
        (article.cover_image.startsWith('http') ? article.cover_image : `http://localhost:3000${article.cover_image}`)
        : null,
      published: Boolean(article.published),
      readingTime: article.reading_time,
      createdAt: article.created_at,
      updatedAt: article.updated_at
    };
    
    res.json(normalizedArticle);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ error: "Failed to fetch article" });
  }
});

router.post("/articles", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, slug, excerpt, content, pillar, coverImage, published, readingTime } = req.body;
    
    // Valider que pillar est une des valeurs autorisées
    const validPillars = ["BUILD", "TEACH", "INSPIRE", "CONVERT"];
    if (!validPillars.includes(pillar)) {
      return res.status(400).json({ error: `Invalid pillar value. Expected ${validPillars.join(" | ")}, received '${pillar}'` });
    }
    
    const [result] = await pool.execute(
      'INSERT INTO articles (title, slug, excerpt, content, pillar, cover_image, published, reading_time, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
      [title, slug, excerpt, content, pillar, coverImage, published, readingTime]
    );
    const newArticle = { id: (result as mysql.ResultSetHeader).insertId, ...req.body };
    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ error: "Failed to create article" });
  }
});

router.put("/articles/:id", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const { title, slug, excerpt, content, pillar, coverImage, published, readingTime } = req.body;
    
    // Valider que pillar est une des valeurs autorisées
    const validPillars = ["BUILD", "TEACH", "INSPIRE", "CONVERT"];
    if (!validPillars.includes(pillar)) {
      return res.status(400).json({ error: `Invalid pillar value. Expected ${validPillars.join(" | ")}, received '${pillar}'` });
    }
    
    await pool.execute(
      'UPDATE articles SET title = ?, slug = ?, excerpt = ?, content = ?, pillar = ?, cover_image = ?, published = ?, reading_time = ?, updated_at = NOW() WHERE id = ?',
      [title, slug, excerpt, content, pillar, coverImage, published, readingTime, id]
    );
    const [rows] = await pool.execute('SELECT * FROM articles WHERE id = ?', [id]);
    
    // Transformer les données pour correspondre au frontend
    const article = (rows as any[])[0];
    const normalizedArticle = {
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      pillar: article.pillar,
      coverImage: article.cover_image ? 
        (article.cover_image.startsWith('http') ? article.cover_image : `http://localhost:3000${article.cover_image}`)
        : null,
      published: Boolean(article.published),
      readingTime: article.reading_time,
      createdAt: article.created_at,
      updatedAt: article.updated_at
    };
    
    res.json(normalizedArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ error: "Failed to update article" });
  }
});

router.patch("/articles/:id", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const { title, slug, excerpt, content, pillar, coverImage, published, readingTime } = req.body;
    
    // Valider que pillar est une des valeurs autorisées si fourni
    if (pillar) {
      const validPillars = ["BUILD", "TEACH", "INSPIRE", "CONVERT"];
      if (!validPillars.includes(pillar)) {
        return res.status(400).json({ error: `Invalid pillar value. Expected ${validPillars.join(" | ")}, received '${pillar}'` });
      }
    }
    
    // Construire la requête UPDATE dynamiquement
    const updateFields = [];
    const updateValues = [];
    
    if (title !== undefined) { updateFields.push('title = ?'); updateValues.push(title); }
    if (slug !== undefined) { updateFields.push('slug = ?'); updateValues.push(slug); }
    if (excerpt !== undefined) { updateFields.push('excerpt = ?'); updateValues.push(excerpt); }
    if (content !== undefined) { updateFields.push('content = ?'); updateValues.push(content); }
    if (pillar !== undefined) { updateFields.push('pillar = ?'); updateValues.push(pillar); }
    if (coverImage !== undefined) { updateFields.push('cover_image = ?'); updateValues.push(coverImage); }
    if (published !== undefined) { updateFields.push('published = ?'); updateValues.push(published); }
    if (readingTime !== undefined) { updateFields.push('reading_time = ?'); updateValues.push(readingTime); }
    
    updateFields.push('updated_at = NOW()');
    updateValues.push(id);
    
    await pool.execute(
      `UPDATE articles SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );
    
    const [rows] = await pool.execute('SELECT * FROM articles WHERE id = ?', [id]);
    
    // Transformer les données pour correspondre au frontend
    const article = (rows as any[])[0];
    const normalizedArticle = {
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      pillar: article.pillar,
      coverImage: article.cover_image ? 
        (article.cover_image.startsWith('http') ? article.cover_image : `http://localhost:3000${article.cover_image}`)
        : null,
      published: Boolean(article.published),
      readingTime: article.reading_time,
      createdAt: article.created_at,
      updatedAt: article.updated_at
    };
    
    res.json(normalizedArticle);
  } catch (error) {
    console.error("Error patching article:", error);
    res.status(500).json({ error: "Failed to update article" });
  }
});

router.delete("/articles/:id", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    await pool.execute('DELETE FROM articles WHERE id = ?', [id]);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ error: "Failed to delete article" });
  }
});

router.use(healthRouter);
router.use(authRouter);
// router.use(analyticsRouter);
router.use(uploadRouter);
router.use(articlesRouter);
// router.use(projectsRouter);

router.post("/projects", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, slug, description, context, problem, solution, techStack, results, category, coverImage, metric, featured, status } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO projects (title, slug, description, context, problem, solution, tech_stack, results, category, cover_image, metric, featured, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
      [title, slug, description, context, problem, solution, techStack, results, category, coverImage, metric, featured, status]
    );
    const newProject = { id: (result as mysql.ResultSetHeader).insertId, ...req.body };
    res.status(201).json(newProject);
  } catch (error) {
    // biome-ignore lint/suspicious/noConsoleLog: Error logging
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

router.put("/projects/:id", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const { title, slug, description, context, problem, solution, techStack, results, category, coverImage, metric, featured, status } = req.body;
    await pool.execute(
      'UPDATE projects SET title = ?, slug = ?, description = ?, context = ?, problem = ?, solution = ?, tech_stack = ?, results = ?, category = ?, cover_image = ?, metric = ?, featured = ?, status = ?, updated_at = NOW() WHERE id = ?',
      [title, slug, description, context, problem, solution, techStack, results, category, coverImage, metric, featured, status, id]
    );
    const [rows] = await pool.execute('SELECT * FROM projects WHERE id = ?', [id]);
    res.json((rows as any[])[0]);
  } catch (error) {
    // biome-ignore lint/suspicious/noConsoleLog: Error logging
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
});

router.delete("/projects/:id", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    await pool.execute('DELETE FROM projects WHERE id = ?', [id]);
    res.status(204).send();
  } catch (error) {
    // biome-ignore lint/suspicious/noConsoleLog: Error logging
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

export default router;
