import type { IEntrega } from "../../interfaces/IEntrega.js";
import { validaCampoObrigatorio } from "../../utils/validaCampoObrigatorio.js";

export class EntregaRequestDTO implements Pick<
  IEntrega,
  "descricao" | "origem" | "destino"
> {
  descricao: string;
  origem: string;
  destino: string;

  constructor(dados: IEntrega) {
    this.descricao = validaCampoObrigatorio(dados.descricao, "descricao");
    this.origem = validaCampoObrigatorio(dados.origem, "origem");
    this.destino = validaCampoObrigatorio(dados.destino, "destino");
  }
}
