import { StatusEntrega } from "../enums/StatusEntregaEnum.js";
import type { IEntrega } from "../interfaces/IEntrega.js";
import { IEvento } from "../interfaces/IEvento.js";
import type {
  CriaEntregaParams,
  AtualizaEntregaParams,
  TEntregasFilter,
} from "../interfaces/IEntrega.js";
import type { IEntregasRepository } from "../interfaces/IEntregasRepository.js";
import type { PrismaClient } from "../generated/prisma/client";

export class EntregasRepository implements IEntregasRepository {
  constructor(private readonly db: PrismaClient) { }

  public async lista(filtro?: TEntregasFilter): Promise<IEntrega[]> {
    const entregas = await this.db.entrega.findMany({
      where: filtro?.status ? { status: filtro.status } : {},
      include: { historico: true },
    });

    return entregas.map((entrega) => ({
      ...entrega,
      status: StatusEntrega.fromString(entrega.status),
    }));
  }

  public async buscaPorId(id: number): Promise<IEntrega | null> {
    const entrega = await this.db.entrega.findUnique({
      where: { id },
      include: { historico: true },
    })

    return entrega ? {
      ...entrega,
      status: StatusEntrega.fromString(entrega.status),
    } : null
  }

  public async cria(dados: Omit<IEntrega, "id">): Promise<IEntrega> {
    const entrega = await this.db.entrega.create({
      data: {
        ...dados,
        historico: {
          create: dados.historico.map(evento => ({
            descricao: evento.descricao
          }))
        }
      },
      include: { historico: true }
    });

    return {
      ...entrega,
      status: StatusEntrega.fromString(entrega.status),
    };

  }

  // método de atualização genérica para usar em avançar e cancelar
  public async atualiza(
    id: number,
    dados: Partial<AtualizaEntregaParams>,
    descricaoHistorico: string = "Dados atualizados manualmente",
  ): Promise<IEntrega | null> {
    const entrega = await this.db.entrega.update({
      where: { id },
      data: {
        ...dados,
        historico: {
          create: IEvento.cria(descricaoHistorico)
        }
      },
      include: { historico: true },
    })

    return {
      ...entrega,
      status: StatusEntrega.fromString(entrega.status),
    };
  }

  // retorna true se os dados passados existem nas entregas
  public async exists(dados: CriaEntregaParams): Promise<boolean> {

    const entrega = await this.db.entrega.count({
      where: {
        descricao: dados.descricao,
        origem: dados.origem,
        destino: dados.destino,
        status: { in: [StatusEntrega.CRIADA, StatusEntrega.EM_TRANSITO] },
      },
    })

    return entrega > 0;
  }
}
