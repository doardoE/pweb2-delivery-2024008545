export interface IEvento {
  data: string;
  descricao: string;
}

export namespace IEvento {
  export function cria(message: string) {
    return {
      data: new Date().toISOString(),
      descricao: message,
    };
  }
}
