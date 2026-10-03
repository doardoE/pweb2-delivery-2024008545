import type { IMotorista } from "./IMorotista.js";
import type { IEntrega, TEntregasFilter } from "./IEntrega.js";

/**
 * Interface para o repositório de motoristas.
 * Define os métodos que devem ser implementados para gerenciar motoristas e suas entregas.
 */
export interface IMotoristasRepository {
  /**
   * Lista todos os motoristas cadastrados.
   * @returns Uma promessa que devolve um array de motoristas.
   */
  lista(): Promise<IMotorista[]>;

  /**
   * Busca um motorista pelo seu ID.
   * @param id ID do motorista a ser consultado
   * @returns Uma promessa que devolve um motorista
   */
  buscaPorId(id: number): Promise<IMotorista | null>;

  /**
   * Busca um motorista pelo seu CPF.
   * @param cpf CPF do motorista a ser consultado
   * @returns Uma promessa que devolve um motorista
   */
  buscaPorCpf(cpf: string): Promise<IMotorista | null>;

  /**
   *  Cria um novo motorista.
   * @param dados Motorista a ser criado
   * @returns Uma promessa que devolve o motorista criado
   */
  cria(dados: Omit<IMotorista, "id">): Promise<IMotorista>;

  /**
   *  Atualiza os dados de um motorista existente.
   * @param id ID do motorista a ser atualizado
   * @param dados Dados do usuário que devem ser atualizados
   */
  atualiza(
    id: number,
    dados: Partial<Omit<IMotorista, "id">>,
  ): Promise<IMotorista | null>;

  /**
   * Lista as entregas associadas a um motorista específico.
   * @param id  ID do motorista a ser consutada as entregas
   * @param filtro Filtro para aplicar na listagem de entregas, pode ser [ENTREGUE, EM_TRANSITO, ENTREGUE, CANCELADA].
   */
  listaEntregasPorMotoristaId(
    id: number,
    filtro: TEntregasFilter,
  ): Promise<IEntrega[]>;
}
