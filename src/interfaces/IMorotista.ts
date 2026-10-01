import { Status } from "../enums/StatusEnum.js";

export interface IMotorista {
  id: number;
  nome: string;
  cpf: string;
  placaVeiculo?: string | null;
  status: Status;
}

export type CriaMotoristaParams = Pick<IMotorista, "nome" | "cpf"> &
  Partial<Pick<IMotorista, "placaVeiculo">>;
