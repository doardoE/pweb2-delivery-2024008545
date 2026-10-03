import type { IEntrega } from "./IEntrega.js";
import type { TEntregasFilter } from "./IEntrega.js";
import type { CriaEntregaParams } from "./IEntrega.js";

/**
 * Interface para o repositório de entregas
 *
 * Define os métodos que devem ser implementados por qualquer repositório de entregas.
 */
export interface IEntregasRepository {
  /**
   * Lista as entregas com base em um filtro opcional.
   * @param filtro Filtro para aplicar na listagem de entregas, pode ser [ENTREGUE, EM_TRANSITO, ENTREGUE, CANCELADA].
   * @returns Uma promessa que devolve um array de entregas.
   */
  lista(filtro: TEntregasFilter): Promise<IEntrega[]>;

  /**
   * Busca uma entrega por seu ID.
   * @param id ID da entrega a ser buscada.
   * @returns Uma promessa que devolve a entrega encontrada ou null se não encontrada.
   */
  buscaPorId(id: number): Promise<IEntrega | null>;

  /**
   * Cria uma nova entrega.
   * @param entrega Entrega a ser criada.
   * @returns Uma promessa que devolve a entrega criada.
   */
  cria(entrega: CriaEntregaParams): Promise<IEntrega>;

  /**
   * Atualiza uma entrega existente.
   * @param id  ID da entrega a ser atualizada
   * @param dados Dados a serem atualizados na entrega.
   * @param descricaoHistorico Descrição do evento a ser adicionado ao histórico da entrega.
   * @returns Uma promessa que devolve a entrega atualizada ou null se não encontrada.
   */
  atualiza(
    id: number,
    dados: Partial<Omit<IEntrega, "id" | "historico">>,
    descricaoHistorico?: string,
  ): Promise<IEntrega | null>;

  /**
   * Verifica existência de uma entrega ativa com os mesmos dados.
   *
   * @param dados Dados de entrada do sistema para verificar duplicidade de entrega ativa
   * @returns Um booleano com verdadeiro se existir e falso se não existir
   */
  exists(dados: CriaEntregaParams): Promise<boolean>;
}
