import type { StatusEntrega } from "../../enums/StatusEntregaEnum.js";
import type { IEntrega } from "../../interfaces/IEntrega.js";
import type { IEvento } from "../../interfaces/IEvento.js";

export class EntregaResponseDTO implements IEntrega {
  id: number;
  descricao: string;
  origem: string;
  destino: string;
  status: StatusEntrega;
  motoristaId: number | null;
  historico: IEvento[];

  constructor(dados: IEntrega) {
    this.id = dados.id;
    this.descricao = dados.descricao;
    this.origem = dados.origem;
    this.destino = dados.destino;
    this.status = dados.status;
    this.motoristaId = dados.motoristaId;
    this.historico = dados.historico;
  }
}
