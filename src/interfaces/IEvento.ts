export interface IEvento {
  data: Date;
  descricao: string;
}

export namespace IEvento {
  export function cria(message: string) {
    return {
      data: new Date(),
      descricao: message,
    };
  }
}
