import type { Request, Response, NextFunction } from "express";
import { MotoristasService } from "../services/MotoristasService.js";
import { MotoristasReponseDTO } from "../dtos/response/MotoristasReponseDTO.js";
import type { IMotorista } from "../interfaces/IMorotista.js";
import { MotoristasRequestDTO } from "../dtos/request/MotoristaRequestDTO.js";
import type { IEntrega } from "../interfaces/IEntrega.js";
import { EntregaResponseDTO } from "../dtos/response/EntregaResponseDTO.js";
import { EntregaFilterRequestDTO } from "../dtos/request/EntregaFilterRequestDTO.js";

export class MotoristasController {
  constructor(private motoristasService: MotoristasService) {}

  lista = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const motoristas: IMotorista[] = await this.motoristasService.lista();
      const lista = motoristas.map(
        (motorista) => new MotoristasReponseDTO(motorista),
      );
      res.json(lista);
    } catch (err) {
      next(err);
    }
  };

  buscaPorId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const motorista: IMotorista = await this.motoristasService.buscaPorId(
        Number(req.params.id),
      );
      res.json(new MotoristasReponseDTO(motorista));
    } catch (err) {
      next(err);
    }
  };

  cria = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = new MotoristasRequestDTO(req.body);
      const motorista = await this.motoristasService.cria(dto);
      res.status(201).json(new MotoristasReponseDTO(motorista));
    } catch (err) {
      next(err);
    }
  };

  listaEntrega = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filtro: EntregaFilterRequestDTO = new EntregaFilterRequestDTO(
        req.query,
      );
      const entregas: IEntrega[] = await this.motoristasService.listaEntregas(
        Number(req.params.id), filtro
      );
      const lista = entregas.map((entrega) => new EntregaResponseDTO(entrega));
      res.json(lista);
    } catch (err) {
      next(err);
    }
  };
}
