import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

const aceitaJson = (req: Request): boolean => {
  const accept = req.get("accept") ?? "";
  return (
    req.path.startsWith("/api/") ||
    /^\/motoristas\/[^/]+\/entregas\/?$/.test(req.path) ||
    (accept.includes("application/json") && !accept.includes("text/html"))
  );
};

/** Resposta HTML para caminhos sem rota correspondente. */
export const naoEncontrado = (req: Request, res: Response): void => {
  if (aceitaJson(req)) {
    res.status(404).json({ erro: `A rota ${req.originalUrl} não existe.` });
    return;
  }

  res.status(404).render("erros/404", {
    titulo: "Página não encontrada",
    mensagem: `A página "${req.originalUrl}" não existe.`,
  });
};

/** Converte erros da aplicação em HTML para navegação e JSON para clientes de API. */
export const middlewareDeErros = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const status = err instanceof AppError ? err.statusCode : 500;

  if (aceitaJson(req)) {
    res.status(status).json({ erro: err.message });
    return;
  }

  if (status >= 500) {
    console.error(err);
  }

  res.status(status).render("erros/erro", {
    titulo: status === 500 ? "Erro interno" : `Erro ${status}`,
    codigo: status,
    mensagem:
      status === 500 && process.env.NODE_ENV === "production"
        ? "Ocorreu um erro inesperado. Tente novamente."
        : err.message,
  });
};
