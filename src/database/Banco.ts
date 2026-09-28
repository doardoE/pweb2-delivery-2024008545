import type { IEntrega } from "../interfaces/IEntrega.js";

export class Banco {
  entregas: IEntrega[] = [];
  proximoIdEntregas: number = 1;
}
