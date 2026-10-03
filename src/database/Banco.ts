import type { IEntrega } from "../interfaces/IEntrega.js";
import type { IMotorista } from "../interfaces/IMorotista.js";

export class Banco {
  entregas: IEntrega[] = [];
  proximoIdEntregas: number = 1;

  morotistas: IMotorista[] = [];
  proximoIdMotoristas: number = 1;
}
