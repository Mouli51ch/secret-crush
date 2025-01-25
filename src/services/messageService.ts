import { Message, IMessage } from '../models/message';

export const createMessage = async (senderId: string, recipientId: string, content: string): Promise<IMessage> => {
  const message = new Message({
    senderId,
    recipientId,
    content
  });
  return await message.save();
};

export const getMessagesBetweenUsers = async (userId1: string, userId2: string): Promise<IMessage[]> => {
  return Message.find({
    $or: [
      { senderId: userId1, recipientId: userId2 },
      { senderId: userId2, recipientId: userId1 }
    ]
  }).sort({ timestamp: 1 });
};