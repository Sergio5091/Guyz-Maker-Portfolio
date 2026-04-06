import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@guyzmaker.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123456';

export interface AdminPayload {
  email: string;
  iat?: number;
  exp?: number;
}

export function generateAdminToken(): string {
  return jwt.sign(
    { email: ADMIN_EMAIL },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyAdminToken(token: string): AdminPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export function validateAdminCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}
