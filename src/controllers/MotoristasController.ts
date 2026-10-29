import type { Request, Response, NextFunction } from "express";
import { MotoristasService } from "../services/MotoristasService.js";
import { MotoristasReponseDTO } from "../dtos/response/MotoristasReponseDTO.js";
import type { IMotorista } from "../interfaces/IMorotista.js";
import { MotoristasRequestDTO } from "../dtos/request/MotoristaRequestDTO.js";
import type { IEntrega } from "../interfaces/IEntrega.js";
import { EntregaResponseDTO } from "../dtos/response/EntregaResponseDTO.js";
import { EntregaFilterRequestDTO } from "../dtos/request/EntregaFilterRequestDTO.js";
import { AppError, ValidationError } from "../errors/AppError.js";

export class MotoristasController {
  constructor(private motoristasService: MotoristasService) { }


  lista = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const motoristas: IMotorista[] = await this.motoristasService.lista();
      const lista = motoristas.map(
        (motorista) => new MotoristasReponseDTO(motorista),
      );
      res.render("motoristas/index", {
        titulo: "Motoristas",
        motoristas: lista,
      });
    } catch (err) {
      next(err);
    }
  };

  buscaPorId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const motorista: IMotorista = await this.motoristasService.buscaPorId(
        Number(req.params.id),
      );
      res.render("motoristas/show", {
        titulo: motorista.nome,
        motorista: new MotoristasReponseDTO(motorista),
      });
    } catch (err) {
      next(err);
    }
  };

  novo = (_req: Request, res: Response) => {
    res.render("motoristas/new", {
      titulo: "Novo motorista",
      erros: [],
      dados: {},
    });
  };

  cria = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = new MotoristasRequestDTO(req.body);
      await this.motoristasService.cria(dto);
      req.flash('sucesso', 'Motorista criado.');
      res.redirect(303, "/motoristas");
    } catch (err: unknown) {
      if (err instanceof AppError && err.statusCode < 500) {
        return res.status(err.statusCode).render("motoristas/new", {
          erros: [err.message],
          dados: req.body,
        });
      }

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
