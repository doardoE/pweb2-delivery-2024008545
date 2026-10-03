import { Banco } from "../database/Banco.js";
import { StatusEntrega } from "../enums/StatusEntregaEnum.js";
import type { IEntrega } from "../interfaces/IEntrega.js";
import { IEvento } from "../interfaces/IEvento.js";
import type {
  CriaEntregaParams,
  AtualizaEntregaParams,
  TEntregasFilter,
} from "../interfaces/IEntrega.js";
import type { IEntregasRepository } from "../interfaces/IEntregasRepository.js";

export class EntregasRepository implements IEntregasRepository {
  constructor(private db: Banco) {}

  public async lista(filtro?: TEntregasFilter): Promise<IEntrega[]> {
    if (filtro && filtro.status)
      return this.db.entregas.filter(
        (entrega) => entrega.status === filtro.status,
      );

    return this.db.entregas;
  }

  public async buscaPorId(id: number): Promise<IEntrega | null> {
    return this.db.entregas.find((entrega) => entrega.id === id) || null;
  }

  public async cria(dados: Omit<IEntrega, "id">): Promise<IEntrega> {
    const entrega: IEntrega = {
      id: this.db.proximoIdEntregas,
      ...dados,
    };
    this.db.entregas.push(entrega);
    this.db.proximoIdEntregas++;
    return entrega;
  }

  // método de atualização genérica para usar em avançar e cancelar
  public async atualiza(
    id: number,
    dados: Partial<AtualizaEntregaParams>,
    descricaoHistorico: string = "Dados atualizados manualmente",
  ): Promise<IEntrega | null> {
    const entrega = await this.buscaPorId(id);

    if (entrega) {
      Object.assign(entrega, dados);
      entrega.historico.push(IEvento.cria(descricaoHistorico));
    }

    return entrega;
  }

  // retorna true se os dados passados existem nas entregas
  public async exists(dados: CriaEntregaParams): Promise<boolean> {
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
