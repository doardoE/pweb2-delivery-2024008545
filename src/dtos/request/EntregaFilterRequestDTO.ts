import { StatusEntrega } from "../../enums/StatusEntregaEnum.js";
import type { TEntregasFilter } from "../../repositories/EntregasRepository.js";

export class EntregaFilterRequestDTO implements TEntregasFilter {
  status?: StatusEntrega;

  constructor(dados: TEntregasFilter) {
    if (dados.status) {
      this.status = StatusEntrega.fromString(dados.status)
    }
  }
}
