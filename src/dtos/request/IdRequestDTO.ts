import { validaCampoObrigatorio } from "../../utils/validaCampoObrigatorio.js";
import type { IdParam } from "../../interfaces/IEntrega.js";

export class IdRequestDTO implements IdParam {
  id: number;
  constructor(id: number) {
    this.id = validaCampoObrigatorio(id, "id");
  }
}
