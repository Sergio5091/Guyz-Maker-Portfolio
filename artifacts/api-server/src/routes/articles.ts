import { Router, type IRouter, type Request, type Response } from "express";
import { requireAuth, type AuthenticatedRequest } from "../middleware/auth.js";
// @ts-ignore
import mysql from "mysql2/promise";

const router: IRouter = Router();

// Configuration MySQL (même que index.ts)
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
    if (!pool) {
      pool = mysql.createPool(dbConfig);
      console.log('✅ Articles: MySQL connected successfully');
    }
  } catch (error) {
    console.error('❌ Articles: MySQL connection failed:', error);
    process.exit(1);
  }
}

// GET /articles - Lister tous les articles
router.get("/", async (req: Request, res: Response) => {
  try {
    await initDB();
    const [rows] = await pool.execute('SELECT * FROM articles ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

// GET /articles/:id - Récupérer un article spécifique
router.get("/:id", async (req: Request, res: Response) => {
  try {
    await initDB();
    const id = parseInt(req.params.id as string);
    const [rows] = await pool.execute('SELECT * FROM articles WHERE id = ?', [id]);
    const article = (rows as any[])[0];
    
    if (!article) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
    
    res.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ error: "Failed to fetch article" });
  }
});

// POST /articles - Créer un article
router.post("/", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    await initDB();
    const { title, slug, excerpt, content, pillar, coverImage, published, readingTime } = req.body;
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

// PUT /articles/:id - Mettre à jour un article
router.put("/:id", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    await initDB();
    const id = parseInt(req.params.id as string);
    const { title, slug, excerpt, content, pillar, coverImage, published, readingTime } = req.body;
    await pool.execute(
      'UPDATE articles SET title = ?, slug = ?, excerpt = ?, content = ?, pillar = ?, cover_image = ?, published = ?, reading_time = ?, updated_at = NOW() WHERE id = ?',
      [title, slug, excerpt, content, pillar, coverImage, published, readingTime, id]
    );
    const [rows] = await pool.execute('SELECT * FROM articles WHERE id = ?', [id]);
    res.json((rows as any[])[0]);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ error: "Failed to update article" });
  }
});

// DELETE /articles/:id - Supprimer un article
router.delete("/:id", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    await initDB();
    const id = parseInt(req.params.id as string);
    await pool.execute('DELETE FROM articles WHERE id = ?', [id]);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ error: "Failed to delete article" });
  }
});

export default router;
