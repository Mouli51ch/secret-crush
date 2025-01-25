import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/database';
import messageRoutes from './routes/messageRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
connectToDatabase()
  .then(() => {
    // Routes
    app.use('/api/messages', messageRoutes);

    // Error handling middleware
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    }).on('error', (error) => {
      console.error('Failed to start server:', error);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });