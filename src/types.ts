import type { Request } from 'express'

export interface UsuarioLogeado {
    id: number,
    usuario: string,
    nombres: string,
    apellidos: string,
    iat: number,
    exp: number
}

export interface RequestConUsuario extends Request {
    usuarioLogeado: UsuarioLogeado
}