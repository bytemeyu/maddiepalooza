import express from 'express';
import artistRoutes from './routes/artistRoutes.js';

const app = express();

app.use(express.json());

app.use('/api/artist', artistRoutes);

export default app;