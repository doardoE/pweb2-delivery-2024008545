import type { Request, Response, NextFunction } from "express";
import { EntregaFilterRequestDTO } from "../dtos/request/EntregaFilterRequestDTO.js";
import { EntregaRequestDTO } from "../dtos/request/EntregaRequestDTO.js";
import { AppError } from "../errors/AppError.js";
import type { EntregasService } from "../services/EntregasService.js";
import type { MotoristasService } from "../services/MotoristasService.js";

export class EntregasController {
  constructor(
    private entregasService: EntregasService,
    private motoristasService: MotoristasService,
  ) {}

  lista = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filtro = new EntregaFilterRequestDTO(req.query);
      const entregas = await this.entregasService.lista(filtro);
      res.render("entregas/index", {
        titulo: "Entregas",
        entregas,
        statusSelecionado: filtro.status ?? "",
      });
    } catch (err) {
      next(err);
    }
  };

  buscaPorId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entrega = await this.entregasService.buscaPorId(Number(req.params.id));
      const motoristas = await this.motoristasService.lista();
      res.render("entregas/show", {
        titulo: `Entrega #${entrega.id}`,
        entrega,
        motoristas,
      });
    } catch (err) {
      next(err);
    }
  };

  novo = (_req: Request, res: Response) => {
    res.render("entregas/new", { titulo: "Nova entrega", erros: [], dados: {} });
  };

  cria = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entrega = await this.entregasService.cria(
        new EntregaRequestDTO(req.body),
      );
      req.flash("sucesso", "Entrega criada.");
      res.redirect(303, `/entregas/${entrega.id}`);
    } catch (err) {
      if (err instanceof AppError && err.statusCode < 500) {
        res.status(err.statusCode).render("entregas/new", {
          titulo: "Nova entrega",
          erros: [err.message],
          dados: req.body,
        });
        return;
      }
      next(err);
    }
  };

  avanca = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entrega = await this.entregasService.avanca(Number(req.params.id));
      req.flash("sucesso", `Entrega avançou para ${entrega.status}.`);
      res.redirect(303, `/entregas/${entrega.id}`);
    } catch (err) {
      next(err);
    }
  };

  cancela = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entrega = await this.entregasService.cancela(Number(req.params.id));
      req.flash("sucesso", "Entrega cancelada.");
      res.redirect(303, `/entregas/${entrega.id}`);
    } catch (err) {
      next(err);
    }
  };

  historico = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.entregasService.historico(Number(req.params.id));
      res.redirect(303, `/entregas/${req.params.id}`);
    } catch (err) {
      next(err);
    }
  };

  atribui = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entrega = await this.entregasService.atribui(
        { id: Number(req.params.id) },
        Number(req.body.motoristaId),
      );
      req.flash("sucesso", "Motorista atribuído à entrega.");
      res.redirect(303, `/entregas/${entrega.id}`);
    } catch (err) {
      next(err);
    }
  };
}
