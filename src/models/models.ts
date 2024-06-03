export interface UsuarioLogin {
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    tipo: string;
    foto: string;
    token: string;
}

export interface Usuario {
    id?: number;
    nome: string;
    usuario: string;
    senha: string;
    tipo?: string;
    foto: string;
}

export interface temaInterface {
    id: number,
    description?: string,
    postagem?: []
}

export interface postInterface {
    id?: number,
    titulo: string,
    text: string,
    date: string,
    foto: string,
    tema: temaInterface,
    usuario: Usuario,
}