import type { IMotorista } from "../interfaces/IMorotista.js";
import type { Banco } from "../database/Banco.js";
import type { IEntrega } from "../interfaces/IEntrega.js";
import type { TEntregasFilter } from "../interfaces/IEntrega.js";
import type { IMotoristasRepository } from "../interfaces/IMotoristasRepository.js";

export class MotoristasRepository implements IMotoristasRepository {
  constructor(private db: Banco) {}

  public async lista(): Promise<IMotorista[]> {
    return this.db.morotistas;
  }

  public async buscaPorId(id: number): Promise<IMotorista | null> {
    return this.db.morotistas.find((motorista) => motorista.id === id) || null;
  }

  public async buscaPorCpf(cpf: string): Promise<IMotorista | null> {
    return (
      this.db.morotistas.find((motorista) => motorista.cpf === cpf) || null
    );
  }

  public async cria(dados: Omit<IMotorista, "id">): Promise<IMotorista> {
    const motorista: IMotorista = {
      id: this.db.proximoIdMotoristas,
      ...dados,
    };
    this.db.morotistas.push(motorista);
    this.db.proximoIdMotoristas++;
    return motorista;
  }

  public async atualiza(
    id: number,
    dados: Partial<Omit<IMotorista, "id">>,
  ): Promise<IMotorista | null> {
    const motorista = await this.buscaPorId(id);

    if (motorista) {
      Object.assign(motorista, dados);
    }

    return motorista;
  }

  public async listaEntregasPorMotoristaId(
    id: number,
    filtro: TEntregasFilter,
  ): Promise<IEntrega[]> {
    if (filtro && filtro.status) {
      return this.db.entregas.filter(
        (entrega) =>
          entrega.motoristaId === id && entrega.status === filtro.status,
      );
    }

    return this.db.entregas.filter((entrega) => entrega.motoristaId === id);
  }
}
