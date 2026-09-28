import type { StatusEntrega } from "../enums/StatusEntregaEnum.js";
import type { IEvento } from "./IEvento.js";

export interface IEntrega {
  id: number;
  descricao: string;
  origem: string;
  destino: string;
  status: StatusEntrega;
  motoristaId: number | null;
  historico: IEvento[];
}
