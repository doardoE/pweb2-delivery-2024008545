import type { IMotorista } from "../../interfaces/IMorotista.js";
import { Status } from "../../enums/StatusEnum.js";

export class MotoristasReponseDTO implements IMotorista {
  id: number;
  nome: string;
  cpf: string;
  placaVeiculo?: string | null;
  status: Status;

  constructor(dados: IMotorista) {
    this.id = dados.id;
    this.nome = dados.nome;
    this.cpf = dados.cpf;
    this.placaVeiculo = dados.placaVeiculo ?? null;
    this.status = dados.status;
  }
}
