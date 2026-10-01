import type { IMotorista } from "../../interfaces/IMorotista.js";
import { validaCampoObrigatorio } from "../../utils/validaCampoObrigatorio.js";
import { ValidationError } from "../../errors/AppError.js";
import type { CriaMotoristaParams } from "../../interfaces/IMorotista.js";

export class MotoristasRequestDTO implements CriaMotoristaParams {
  public nome: string;
  public cpf: string;
  public placaVeiculo?: string | null;

  constructor(motorista: IMotorista) {
    this.nome = validaCampoObrigatorio(motorista.nome, "nome");
    this.cpf = validaCampoObrigatorio(motorista.cpf, "cpf");
    this.placaVeiculo = motorista.placaVeiculo ?? null;
  }

}
