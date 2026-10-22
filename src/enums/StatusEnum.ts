import { ValidationError } from "../errors/AppError.js";

export enum Status {
  ATIVO = "ATIVO",
  INATIVO = "INATIVO",
}

export namespace Status {
  export function fromString(status: string): Status {
    const sts = status.trim().toUpperCase() as Status;
    if (!Object.values(Status).includes(sts)) {
      throw new ValidationError("Status inválido");
    }
    return sts;
  }
}
