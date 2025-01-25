import { Response } from 'express';
import * as messageService from '../services/messageService';
import { AuthenticatedRequest } from '../types';

export const sendMessage = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { recipientId, content } = req.body;
    const senderId = req.userId;
    if (!senderId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const message = await messageService.createMessage(senderId, recipientId, content);
    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Error sending message' });
  }
};

export const getMessages = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { recipientId } = req.params;
    const senderId = req.userId;
    if (!senderId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const messages = await messageService.getMessagesBetweenUsers(senderId, recipientId);
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Error fetching messages' });
  }
};