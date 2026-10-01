import { ConflictError, NotFoundError } from "../errors/AppError.js";
import type { IMotorista } from "../interfaces/IMorotista.js";
import { MotoristasRepository } from "../repositories/MotoristasRepository.js";
import { Status } from "../enums/StatusEnum.js";
import type { CriaMotoristaParams } from "../interfaces/IMorotista.js";
import type { IEntrega } from "../interfaces/IEntrega.js";
import type { TEntregasFilter } from "../repositories/EntregasRepository.js";

export class MotoristasService {
  constructor(private motoristasRepository: MotoristasRepository) {}

  async lista(): Promise<IMotorista[]> {
    return await this.motoristasRepository.lista();
  }

  async buscaPorId(id: number): Promise<IMotorista> {
    const motorista = await this.motoristasRepository.buscaPorId(id);
    if (!motorista) {
      throw new NotFoundError("Motorista não encontrado");
    }
    return motorista;
  }
  async buscaPorCpf(cpf: string): Promise<IMotorista> {
    const motorista = await this.motoristasRepository.buscaPorCpf(cpf);
    if (!motorista) {
      throw new NotFoundError("Motorista não encontrado");
    }
    return motorista;
  }

  async cria(dados: CriaMotoristaParams): Promise<IMotorista> {
    const motoristaExistente = await this.motoristasRepository.buscaPorCpf(
      dados.cpf,
    );
    if (motoristaExistente) {
      throw new ConflictError("Motorista já existe");
    }

    const motorista: Omit<IMotorista, "id"> = {
      ...dados,
      status: Status.ATIVO,
    };
    return await this.motoristasRepository.cria(motorista);
  }

  async listaEntregas(id: number, filtro: TEntregasFilter): Promise<IEntrega[]> {
    const motorista = await this.buscaPorId(id);
    return await this.motoristasRepository.listaEntregasPorMotoristaId(
      motorista.id, filtro
    );
  }
}
