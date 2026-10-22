import type { IMotorista } from "../interfaces/IMorotista.js";
import type { IEntrega } from "../interfaces/IEntrega.js";
import type { TEntregasFilter } from "../interfaces/IEntrega.js";
import type { IMotoristasRepository } from "../interfaces/IMotoristasRepository.js";
import type { PrismaClient } from "../generated/prisma/client.js";
import { Status } from "../enums/StatusEnum.js";
import { StatusEntrega } from "../enums/StatusEntregaEnum.js";

export class MotoristasRepository implements IMotoristasRepository {
  constructor(private readonly db: PrismaClient) { }

  public async lista(): Promise<IMotorista[]> {
    const motoristas = await this.db.motorista.findMany();

    return motoristas.map(motorista => ({
      ...motorista,
      status: Status.fromString(motorista.status)
    }))
  }

  public async buscaPorId(id: number): Promise<IMotorista | null> {
    const motorista = await this.db.motorista.findUnique({
      where: { id }
    });

    return motorista ? {
      ...motorista,
      status: Status.fromString(motorista.status)
    } : null;
  }

  public async buscaPorCpf(cpf: string): Promise<IMotorista | null> {
    const motorista = await this.db.motorista.findUnique({
      where: { cpf }
    });

    return motorista ? {
      ...motorista,
      status: Status.fromString(motorista.status)
    } : null;
  }

  public async cria(dados: Omit<IMotorista, "id">): Promise<IMotorista> {

    const motorista = await this.db.motorista.create({
      data: { ...dados }
    })

    return {
      ...motorista,
      status: Status.fromString(motorista.status)
    }
  }

  public async atualiza(
    id: number,
    dados: Partial<Omit<IMotorista, "id">>,
  ): Promise<IMotorista | null> {

    const motorista = await this.db.motorista.update({
      where: { id },
      data: { ...dados }
    })

    return {
      ...motorista,
      status: Status.fromString(motorista.status)
    }
  }

  public async listaEntregasPorMotoristaId(
    id: number,
    filtro?: TEntregasFilter,
  ): Promise<IEntrega[]> {

    const entrega = await this.db.entrega.findMany({
      where: {
        motoristaId: id,
        ...(filtro?.status && { status: filtro.status }),
      },
      include: { historico: true }
    })


    return entrega.map(entrega => ({
      ...entrega,
      status: StatusEntrega.fromString(entrega.status)
    }))
  }
}
