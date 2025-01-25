import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { AuthenticatedRequest } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the public key from the file
const publicKeyPath = path.join(__dirname, '..', 'config', 'jwt-public-key.pem');
let publicKey: string;

try {
  publicKey = fs.readFileSync(publicKeyPath, 'utf8');
} catch (error) {
  console.error('Error reading public key file:', error);
  process.exit(1);
}

export const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const decodedToken = jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as jwt.JwtPayload;
    req.userId = decodedToken.sub;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token' });
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token expired' });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
};