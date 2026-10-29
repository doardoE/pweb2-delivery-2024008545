import { Router } from "express";
import { entregasRouter } from "./entregasRouter.js";
import { motoristasRouter } from "./motoristasRouter.js";

export const apiRouter: Router = Router();

apiRouter.get("/api/health", (_req, res) => res.json({ status: "ok" }));
// Compatibilidade com verificações antigas de readiness.
apiRouter.get("/health", (_req, res) => res.json({ status: "ok" }));

apiRouter.get("/", (_req, res) => res.redirect(302, "/entregas"));
apiRouter.use("/entregas", entregasRouter);
apiRouter.use("/motoristas", motoristasRouter);
