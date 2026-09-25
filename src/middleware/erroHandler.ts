import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { HttpEnum } from "../enums/HttpEnum.js";

export const erroHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ erro: err.message });
  }

  return res.status(HttpEnum.INTERNAL_SERVER_ERROR).json({ erro: "Erro interno do servidor" });
};
