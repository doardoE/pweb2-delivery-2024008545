import { Router } from "express";
import { entregasController } from "../factories/instancia.factorie.js";

export const entregasRouter: Router = Router();

entregasRouter.get("/", entregasController.lista);
entregasRouter.get("/:id", entregasController.buscaPorId);
entregasRouter.post("/", entregasController.cria);
entregasRouter.patch("/:id/avancar", entregasController.avanca);
entregasRouter.patch("/:id/cancelar", entregasController.cancela);
entregasRouter.get("/:id/historico", entregasController.historico);