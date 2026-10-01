import type { IMotorista } from "../interfaces/IMorotista.js";
import type { Banco } from "../database/Banco.js";
import type { IEntrega } from "../interfaces/IEntrega.js";
import type { TEntregasFilter } from "./EntregasRepository.js";

export class MotoristasRepository {
  constructor(private db: Banco) {}

  public lista(): IMotorista[] {
    return this.db.morotistas;
  }

  public buscaPorId(id: number): IMotorista | null {
    return this.db.morotistas.find((motorista) => motorista.id === id) || null;
  }

  public buscaPorCpf(cpf: string): IMotorista | null {
    return (
      this.db.morotistas.find((motorista) => motorista.cpf === cpf) || null
    );
  }

  public cria(dados: Omit<IMotorista, "id">): IMotorista {
    const motorista: IMotorista = {
      id: this.db.proximoIdMotoristas,
      ...dados,
    };
    this.db.morotistas.push(motorista);
    this.db.proximoIdMotoristas++;
    return motorista;
  }

  public atualiza(
    id: number,
    dados: Partial<Omit<IMotorista, "id">>,
  ): IMotorista | null {
    const motorista = this.buscaPorId(id);

    if (motorista) {
      Object.assign(motorista, dados);
    }

    return motorista;
  }

  public listaEntregasPorMotoristaId(
    id: number,
    filtro: TEntregasFilter,
  ): IEntrega[] {
    if (filtro && filtro.status) {
      return this.db.entregas.filter(
        (entrega) =>
          entrega.motoristaId === id && entrega.status === filtro.status,
      );
    }

    return this.db.entregas.filter((entrega) => entrega.motoristaId === id);
  }
}
