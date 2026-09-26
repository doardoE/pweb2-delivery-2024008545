import { Router } from "express";
import { entregasRouter } from "./entregasRouter.js";

export const apiRouter: Router = Router()

// Health check exigido pelo contrato de execução (não remova).
apiRouter.get('/health', (req, res) => res.json({ status: 'ok' }));

// Rotas da api
apiRouter.use('/entregas', entregasRouter)