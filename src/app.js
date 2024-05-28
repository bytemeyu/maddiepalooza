import express from 'express';
import artistRoutes from './routes/artistRoutes.js';
import stageRoutes from './routes/stageRoutes.js';

const app = express();

app.use(express.json());

app.use('/api/artist', artistRoutes);
app.use('/api/stage', stageRoutes);

export default app;