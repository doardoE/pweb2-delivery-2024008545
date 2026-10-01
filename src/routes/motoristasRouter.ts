import { Router } from "express";
import { motoristasController } from "../factories/instancia.factorie.js";

export const motoristasRouter: Router = Router();

motoristasRouter.post("/", motoristasController.cria);
motoristasRouter.get("/", motoristasController.lista);
motoristasRouter.get("/:id", motoristasController.buscaPorId);
motoristasRouter.get("/:id/entregas", motoristasController.listaEntrega);
