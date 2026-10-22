import { EntregasController } from "../controllers/EntregasController.js";
import { MotoristasController } from "../controllers/MotoristasController.js";
import { prisma } from "../prisma/lib/prisma.js";
import { EntregasRepository } from "../repositories/EntregasRepository.js";
import { MotoristasRepository } from "../repositories/MotoristasRepository.js";
import { EntregasService } from "../services/EntregasService.js";
import { MotoristasService } from "../services/MotoristasService.js";

// repositories
const entregasRepository = new EntregasRepository(prisma);
const motoristasRepository = new MotoristasRepository(prisma);

//services
const motoristasService = new MotoristasService(motoristasRepository);
const entregasService = new EntregasService(entregasRepository, motoristasService);
// controllers
export const entregasController = new EntregasController(entregasService);
export const motoristasController = new MotoristasController(motoristasService);
