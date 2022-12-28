import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const validarToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_TOKEN as string) 
            // req.
            next()
        } catch (error) {
            return res.status(401).json({ message: 'Token inválido' })
        }
    } else {
        return res.status(401).json({ message: 'Token no enviado' })
    } 
}