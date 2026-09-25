import express from 'express';
import { erroHandler } from "./src/middleware/erroHandler.js";
// import { criarRotas } from './src/routes/index.js';  // <- descomente quando criar as rotas

const app = express();
app.use(express.json());

// Health check exigido pelo contrato de execução (não remova).
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// TODO: monte aqui o roteador da sua API (composition root em src/routes):
// app.use('/api', criarRotas());

// 404 para rotas não mapeadas (mantenha por último, antes do listen).
app.use((req, res) => res.status(404).json({ erro: 'recurso não encontrado' }));

//middleware de erros
app.use(erroHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Delivery Tracker rodando em http://localhost:${PORT}`));
