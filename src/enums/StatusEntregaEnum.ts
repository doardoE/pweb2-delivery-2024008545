import { BusinessRuleError } from "../errors/AppError.js";
import type { IEntrega } from "../interfaces/IEntrega.js";

export enum StatusEntrega {
  CRIADA = "CRIADA",
  EM_TRANSITO = "EM_TRANSITO",
  ENTREGUE = "ENTREGUE",
  CANCELADA = "CANCELADA",
}

export namespace StatusEntrega {
  export function avanca(status: StatusEntrega) {
    if (status === StatusEntrega.CRIADA) {
      return StatusEntrega.EM_TRANSITO;
    }

    if (status === StatusEntrega.EM_TRANSITO) {
      return StatusEntrega.ENTREGUE;
    }

    throw new BusinessRuleError("Não é possível avançar status");
  }

  export function toString(status: StatusEntrega) {
    const descricao: Record<StatusEntrega, string> = {
      [StatusEntrega.CRIADA]: "A entrega foi registada.",
      [StatusEntrega.EM_TRANSITO]: "A entrega está em trânsito",
      [StatusEntrega.ENTREGUE]: "A entrega chegou ao destino.",
      [StatusEntrega.CANCELADA]: "A entrega foi cancelada",
    };
    return descricao[status];
  }

  export function fromString(status: string): StatusEntrega {
    return status.trim().toUpperCase() as StatusEntrega;
  }
}
