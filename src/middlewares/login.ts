import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { UsuarioLogeado, RequestConUsuario } from '../types'

export const validarToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) 
            const info: UsuarioLogeado = jwt.decode(token) as UsuarioLogeado

            req.usuario = info
            next()
        } catch (error) {
            return res.status(401).json({ message: 'Error al validar el token', error })
        }
    } else {
        return res.status(401).json({ message: 'Token no encontrado' })
    } 
}