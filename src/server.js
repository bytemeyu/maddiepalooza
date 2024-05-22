import express from 'express';
import dotenv from 'dotenv';
import app from './src/app.js';

dotenv.config({ path: './.env.development.local' });

const PORT = process.env.PORT || 3000;

const server = express();

server.use('/', app);

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});