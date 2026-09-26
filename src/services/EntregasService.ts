import type { EntregaFilterRequestDTO } from "../dtos/request/EntregaFilterRequestDTO.js";
import { StatusEntrega } from "../enums/StatusEntregaEnum.js";
import {
  AppError,
  BusinessRuleError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../errors/AppError.js";
import type { IEntrega } from "../interfaces/IEntrega.js";
import type { IEvento } from "../interfaces/IEvento.js";
import type {
  CriaEntregaParams,
  EntregasRepository,
} from "../repositories/EntregasRepository.js";

export class EntregasService {
  constructor(private entregasRepository: EntregasRepository) {}

  async lista(filtro: EntregaFilterRequestDTO): Promise<IEntrega[]> {
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
    const { descricao, origem, destino } = dados;

    if (!dados || !descricao || !origem || !descricao) {
      throw new ValidationError(
        "descricao, origem ou destino não podem ser vazios",
      );
    }

    if (origem === destino) {
      throw new ValidationError("origem não pode ser igual a destino");
    }

    if (this.entregasRepository.exists(dados)) {
      throw new ConflictError("Já existe um entrega ativa com esses dados");
    }

    const entrega = await this.entregasRepository.cria(dados);
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
}
