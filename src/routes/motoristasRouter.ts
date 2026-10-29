import { Router } from "express";
import { motoristasController } from "../factories/instancia.factorie.js";

export const motoristasRouter: Router = Router();

motoristasRouter.get("/", motoristasController.lista);
motoristasRouter.get("/new", motoristasController.novo);
motoristasRouter.post("/", motoristasController.cria);
motoristasRouter.get("/:id", motoristasController.buscaPorId);
motoristasRouter.get("/:id/entregas", motoristasController.listaEntrega);
