import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './mongodb/connect.js';
import PostRoutes from './routes/PostRoutes.js';
import DalleRoutes from './routes/DalleRoutes.js';

const app = express();
const port = 5000;

const dbUrl = process.env.MONGO_URI || process.env.MONGODB_URL;
dotenv.config();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/v1/post', PostRoutes);
app.use('/v1/dalle', DalleRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to !DALL-E');
});

async function startServer() {
  try {
    connectDb(dbUrl);
    app.listen(port, () => {
      // console.log(`server listen on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();
