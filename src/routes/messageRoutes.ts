import { Router } from 'express';
import { sendMessage, getMessages } from '../controllers/messageController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/', requireAuth, sendMessage);
router.get('/:recipientId', requireAuth, getMessages);

export default router;