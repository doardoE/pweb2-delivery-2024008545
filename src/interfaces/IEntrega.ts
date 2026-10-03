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

export type IdParam = Pick<IEntrega, "id">;

//  fica com os campos: descicao, origem e destino
export type CriaEntregaParams = Pick<
  IEntrega,
  'descricao' | 'origem' | 'destino'
>;

// pode atualizar tudo menos id e histórico (apenas insere)
export type AtualizaEntregaParams = Omit<IEntrega, "id" | "historico">;

export type TEntregasFilter = Partial<Pick<IEntrega, "status">>;
