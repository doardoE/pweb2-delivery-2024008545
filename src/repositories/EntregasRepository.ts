import { Banco } from "../database/Banco.js";
import { StatusEntrega } from "../enums/StatusEntregaEnum.js";
import type { IEntrega } from "../interfaces/IEntrega.js";
import { IEvento } from "../interfaces/IEvento.js";

//  fica com os campos: descicao, origem e destino
export type CriaEntregaParams = Omit<
  IEntrega,
  "id" | "status" | "motoristaId" | "historico"
>;

// pode atualizar tudo menos id e histórico (apenas insere)
export type AtualizaEntregaParams = Omit<IEntrega, "id" | "historico">;

export type TEntregasFilter = Partial<Pick<IEntrega, "status">>;

export class EntregasRepository {
  constructor(private db: Banco) {}

  public lista(filtro: TEntregasFilter): IEntrega[] {
    if (filtro && filtro.status)
      return this.db.entregas.filter(
        (entrega) => entrega.status === filtro.status,
      );

    return this.db.entregas;
  }

  public buscaPorId(id: number): IEntrega | undefined {
    return this.db.entregas.find((entrega) => entrega.id === id);
  }

  public cria(dados: CriaEntregaParams): IEntrega {
    const entrega: IEntrega = {
      id: this.db.proximoIdEntregas,
      ...dados,
      status: StatusEntrega.CRIADA,
      motoristaId: null,
      historico: [IEvento.cria(StatusEntrega.toString(StatusEntrega.CRIADA))],
    };
    this.db.entregas.push(entrega);
    this.db.proximoIdEntregas++;
    return entrega;
  }

  // método de atualização genérica para usar em avançar e cancelar
  public atualiza(
    id: number,
    dados: Partial<AtualizaEntregaParams>,
    descricaoHistorico: string = "Dados atualizados manualmente",
  ): IEntrega | undefined {
    const entrega = this.buscaPorId(id);

    if (entrega) {
      Object.assign(entrega, dados);
      entrega.historico.push(IEvento.cria(descricaoHistorico));
    }

    return entrega;
  }

  // retorna true se os dados passados existem nas entregas
  public exists(dados: CriaEntregaParams): boolean {
    return this.db.entregas.some(
      (entrega) =>
        entrega.descricao === dados.descricao &&
        entrega.origem === dados.origem &&
        entrega.destino === dados.destino &&
        entrega.status != StatusEntrega.ENTREGUE &&
        entrega.status != StatusEntrega.CANCELADA,
    );
  }
}
