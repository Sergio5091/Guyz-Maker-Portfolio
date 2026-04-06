import { Router, type Request, type Response } from "express";
import { requireAuth, type AuthenticatedRequest } from "../middleware/auth.js";
import multer, { type FileFilterCallback, type DestinationCallback, type FileNameCallback } from "multer";
import path from "path";
import fs from "fs";

// Interface pour étendre Request avec la propriété file de multer
interface AuthenticatedRequestWithFile extends AuthenticatedRequest {
  file?: Express.Multer.File;
}

const router = Router();

// Configuration de multer pour l'upload
const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: DestinationCallback) => {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req: Request, file: any, cb: FileNameCallback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: Request, file: any, cb: FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Seules les images sont autorisées'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: fileFilter
});

// Route d'upload d'image (protégée)
router.post("/upload", requireAuth, upload.single('image'), async (req: AuthenticatedRequestWithFile, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier fourni" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    return res.json({ 
      success: true, 
      url: imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Erreur lors de l'upload" });
  }
});

export default router;
