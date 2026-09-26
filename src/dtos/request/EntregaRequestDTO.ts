import { ValidationError } from "../../errors/AppError.js";
import type { IEntrega } from "../../interfaces/IEntrega.js";

export class EntregaRequestDTO implements Pick<
  IEntrega,
  "descricao" | "origem" | "destino"
> {
  descricao: string;
  origem: string;
  destino: string;

  constructor(dados: IEntrega) {
    this.descricao = this.campoObrigatorio(dados.descricao);
    this.origem = this.campoObrigatorio(dados.origem);
    this.destino = this.campoObrigatorio(dados.destino);
  }

  public campoObrigatorio(dado: string) {
    if (!dado) throw new ValidationError(`O campo ${dado} é obrigatório`);
    return dado;
  }
}
