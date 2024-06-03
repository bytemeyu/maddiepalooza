import express from 'express';
import artistRoutes from './routes/artistRoutes.js';
import stageRoutes from './routes/stageRoutes.js';
import performanceRoutes from './routes/performanceRoutes.js';
import usersRoutes from './routes/usersRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express();

app.use(express.json());

app.use('/api/artist', artistRoutes);
app.use('/api/stage', stageRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

export default app;