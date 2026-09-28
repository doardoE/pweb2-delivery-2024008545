import { ValidationError } from "../errors/AppError.js";

export function validaCampoObrigatorio(dado: string, nomeCampo: string) {
  if (!dado) throw new ValidationError(`O campo ${nomeCampo} é obrigatório`);
  return dado;
}
