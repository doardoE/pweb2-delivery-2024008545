import { StatusEntrega } from "../../enums/StatusEntregaEnum.js";
import type { IEntrega } from "../../interfaces/IEntrega.js";
import { EventoResponseDTO } from "./EventoResponseDTO.js";

export class EntregaResponseDTO implements IEntrega {
  id: number;
  descricao: string;
  origem: string;
  destino: string;
  status: StatusEntrega;
  motoristaId: number | null;
  historico: EventoResponseDTO[];

  constructor(dados: IEntrega) {
    this.id = dados.id;
    this.descricao = dados.descricao;
    this.origem = dados.origem;
    this.destino = dados.destino;
    this.status = StatusEntrega.fromString(dados.status);
    this.motoristaId = dados.motoristaId;
    this.historico = dados.historico.map((e) => new EventoResponseDTO(e));
  }
}
