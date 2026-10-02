import { EntregasController } from "../controllers/EntregasController.js";
import { MotoristasController } from "../controllers/MotoristasController.js";
import { Banco } from "../database/Banco.js";
import { EntregasRepository } from "../repositories/EntregasRepository.js";
import { MotoristasRepository } from "../repositories/MotoristasRepository.js";
import { EntregasService } from "../services/EntregasService.js";
import { MotoristasService } from "../services/MotoristasService.js";

const db = new Banco();

// repositories
const entregasRepository = new EntregasRepository(db);
const motoristasRepository = new MotoristasRepository(db);

//services
const motoristasService = new MotoristasService(motoristasRepository);
const entregasService = new EntregasService(entregasRepository, motoristasService);
// controllers
export const entregasController = new EntregasController(entregasService);
export const motoristasController = new MotoristasController(motoristasService);
