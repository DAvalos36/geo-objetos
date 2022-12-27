import type { Request, Response, NextFunction } from 'express'
import { ValidationError, AnySchema } from 'yup'

export const validarDatos = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body)
        next()
    } catch (error:  ValidationError | any) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ message: 'Datos incorrectos', error })
        }
    }
}
