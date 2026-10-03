import { StatusEntrega } from "../enums/StatusEntregaEnum.js";
import { Status } from "../enums/StatusEnum.js";
import {
  AppError,
  BusinessRuleError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../errors/AppError.js";
import type { IEntrega } from "../interfaces/IEntrega.js";
import { IEvento } from "../interfaces/IEvento.js";
import type { MotoristasService } from "./MotoristasService.js";
import type { IdParam } from "../interfaces/IEntrega.js";
import type {
  CriaEntregaParams,
  TEntregasFilter,
} from "../interfaces/IEntrega.js";
import { EntregasRepository } from "../repositories/EntregasRepository.js";

export class EntregasService {
  constructor(
    private entregasRepository: EntregasRepository,
    private motoristasService: MotoristasService,
  ) {}

  async lista(filtro: TEntregasFilter): Promise<IEntrega[]> {
    return await this.entregasRepository.lista(filtro);
  }

  async buscaPorId(id: number): Promise<IEntrega> {
    const entrega = await this.entregasRepository.buscaPorId(id);
    if (!entrega) {
      throw new NotFoundError("Entrega não encontrada");
    }
    return entrega;
  }

  async cria(dados: CriaEntregaParams): Promise<IEntrega> {
    const { origem, destino } = dados;

    if (origem === destino) {
      throw new ValidationError("origem não pode ser igual a destino");
    }

    if (await this.entregasRepository.exists(dados)) {
      throw new ConflictError("Já existe um entrega ativa com esses dados");
    }

    const dto: Omit<IEntrega, "id"> = {
      ...dados,
      status: StatusEntrega.CRIADA,
      motoristaId: null,
      historico: [IEvento.cria(StatusEntrega.toString(StatusEntrega.CRIADA))],
    };

    const entrega = await this.entregasRepository.cria(dto);
    return entrega;
  }

  async avanca(id: number): Promise<IEntrega> {
    // os erros são lançados em suas funções
    const entrega = await this.buscaPorId(id);
    entrega.status = StatusEntrega.avanca(entrega.status);

    const atualizado = await this.entregasRepository.atualiza(
      entrega.id,
      { status: entrega.status },
      StatusEntrega.toString(entrega.status),
    );
    if (!atualizado)
      throw new AppError("Erro interno ao atualizar a entrega", 500);
    return atualizado;
  }

  async cancela(id: number): Promise<IEntrega> {
    const entrega = await this.buscaPorId(id);
    if (
      entrega.status == StatusEntrega.ENTREGUE ||
      entrega.status == StatusEntrega.CANCELADA
    ) {
      throw new BusinessRuleError(
        "Não é possível cancelar entrega finalizada ou cancelada",
      );
    }
    const atualizado = await this.entregasRepository.atualiza(
      entrega.id,
      { status: StatusEntrega.CANCELADA },
      StatusEntrega.toString(StatusEntrega.CANCELADA),
    );
    if (!atualizado)
      throw new AppError("Erro interno ao atualizar a entrega", 500);
    return atualizado;
  }

  async historico(id: number): Promise<IEvento[]> {
    const entrega = await this.buscaPorId(id);
    return entrega.historico;
  }

  async atribui(idEntrega: IdParam, idMotorista: number): Promise<IEntrega> {
    const entrega = await this.buscaPorId(idEntrega.id);

    if (entrega.status !== StatusEntrega.CRIADA) {
      throw new BusinessRuleError(
        "Não é possível atribuir entrega sem status CRIADA",
      );
    }

    const motorista = await this.motoristasService.buscaPorId(idMotorista);

    if (motorista.status === Status.INATIVO) {
      throw new BusinessRuleError("Motorista está inativo");
    }

    const atualizado = await this.entregasRepository.atualiza(
      entrega.id,
      { motoristaId: motorista.id },
      `Motorista ${motorista.nome} atribuído a entrega`,
    );
    if (!atualizado)
      throw new AppError("Erro interno ao atualizar a entrega", 500);
    return atualizado;
  }
}
