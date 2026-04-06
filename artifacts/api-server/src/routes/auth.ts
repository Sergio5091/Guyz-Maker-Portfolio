import { Router } from 'express';
import { validateAdminCredentials, generateAdminToken } from '../utils/auth.js';

const router = Router();

router.post('/auth/login', async (req, res): Promise<void> => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  if (validateAdminCredentials(email, password)) {
    const token = generateAdminToken();
    res.json({ 
      token,
      admin: { email }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

router.post('/auth/logout', async (req, res): Promise<void> => {
  res.json({ message: 'Logged out successfully' });
});

router.get('/auth/me', async (req, res): Promise<void> => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authorization token required' });
    return;
  }

  const token = authHeader.substring(7);
  
  try {
    const { verifyAdminToken } = await import('../utils/auth.js');
    const decoded = verifyAdminToken(token);
    res.json({ admin: { email: decoded.email } });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

export default router;
