import { EntregasController } from "../controllers/EntregasController.js";
import { Banco } from "../database/Banco.js";
import { EntregasRepository } from "../repositories/EntregasRepository.js";
import { EntregasService } from "../services/EntregasService.js";

const db = new Banco();

// repositories
const entregasRepository = new EntregasRepository(db);

//services
const entregasService = new EntregasService(entregasRepository);

// controllers
export const entregasController = new EntregasController(entregasService);
