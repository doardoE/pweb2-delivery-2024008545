import type { IEvento } from "../../interfaces/IEvento.js";

export class EventoResponseDTO implements IEvento {
  data: string;
  descricao: string;

  constructor(dados: IEvento) {
    this.data = dados.data;
    this.descricao = dados.descricao;
  }
}
