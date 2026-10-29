import type { Request, Response, NextFunction } from "express";

export const injetarLocals = (_req: Request, res: Response, next: NextFunction) => {
  res.locals.appNome = "Delivery Tracker";
  res.locals.anoAtual = new Date().getFullYear();
  res.locals.flash = null;
  res.locals.erros = [];
  res.locals.dados = {};
  next();
};
