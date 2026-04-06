import { Request, Response, NextFunction } from 'express';
import { verifyAdminToken } from '../utils/auth.js';

export interface AuthenticatedRequest extends Request {
  admin?: {
    email: string;
  };
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authorization token required' });
    return;
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = verifyAdminToken(token);
    req.admin = { email: decoded.email };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }
}
