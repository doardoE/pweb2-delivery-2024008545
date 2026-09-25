import { HttpEnum } from "../enums/HttpEnum.js";

export class AppError extends Error {
  constructor(message: string, public readonly statusCode: HttpEnum) {
    super(message);
    this.name = "AppError";
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Recurso não encontrado") {
    super(message, HttpEnum.BAD_REQUEST);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends AppError {
  constructor(message: string = "Erro de conflito") {
    super(message, HttpEnum.CONFLICT);
    this.name = "ConflictError";
  }
}

export class BusinessRuleError extends AppError {
  constructor(message: string = "Regra de negócio violada") {
    super(message, HttpEnum.UNPROCESSABLE_ENTITY);
    this.name = "UnprocessableEntity";
  }
}

export class ValidationError extends AppError {
  constructor(message: string = "Erro de validação") {
    super(message, HttpEnum.BAD_REQUEST);
    this.name = "Validation Error";
  }
}
