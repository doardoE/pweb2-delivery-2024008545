import type { Request, Response, NextFunction } from "express";
import { EntregaResponseDTO } from "../dtos/response/EntregaResponseDTO.js";
import { EntregaRequestDTO } from "../dtos/request/EntregaRequestDTO.js";
import type { EntregasService } from "../services/EntregasService.js";
import type { IEntrega } from "../interfaces/IEntrega.js";
import type { IEvento } from "../interfaces/IEvento.js";
import { EventoResponseDTO } from "../dtos/response/EventoResponseDTO.js";
import { EntregaFilterRequestDTO } from "../dtos/request/EntregaFilterRequestDTO.js";

export class EntregasController {
  constructor(private entregasService: EntregasService) {}

  lista = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filtro = new EntregaFilterRequestDTO(req.query);
      const entregas: IEntrega[] = await this.entregasService.lista(filtro);
      const lista = entregas.map((entrega) => new EntregaResponseDTO(entrega));
      res.json(lista);
    } catch (err) {
      next(err);
    }
  };

  buscaPorId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entrega: IEntrega = await this.entregasService.buscaPorId(
        Number(req.params.id),
      );
      res.json(new EntregaResponseDTO(entrega));
    } catch (err) {
      next(err);
    }
  };

  cria = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = new EntregaRequestDTO(req.body);
      const entrega = await this.entregasService.cria(dto);
      res.status(201).json(new EntregaResponseDTO(entrega));
    } catch (err) {
      next(err);
    }
  };

  avanca = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entrega: IEntrega = await this.entregasService.avanca(
        Number(req.params.id),
      );
      res.json(new EntregaResponseDTO(entrega));
    } catch (err) {
      next(err);
    }
  };

  cancela = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entrega: IEntrega = await this.entregasService.cancela(
        Number(req.params.id),
      );
      res.json(new EntregaResponseDTO(entrega));
    } catch (err) {
      next(err);
    }
  };

  historico = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const historicos: IEvento[] = await this.entregasService.historico(
        Number(req.params.id),
      );
      const lista = historicos.map(
        (historico) => new EventoResponseDTO(historico),
      );
      res.json(lista);
    } catch (err) {
      next(err);
    }
  };
}
