import type { Request, Response } from 'express'
import { number, object, string } from 'yup'
import { DataSource } from 'typeorm'

import { Objeto } from '../entities/Objeto'

export const schemaCoordenadas = object({
    latitud: number().required(),
    longitud: number().required(),
})

export const schemaObjetoCrear = object({
    descripcion: string().required(),
    latitud: number().required(),
    longitud: number().required(),
})

export const mostrarTodosLosObjetosCercanos = async (req: Request, res: Response) => {


    Objeto.find({
        // select:[

        // ]
        // where: {

        // }
    })
    res.send(`<h1>${req.usuario?.usuario}</h1>`)
}

export const crearObjeto = async (req: Request, res: Response) => {
    const objeto = new Objeto()
    objeto.descripcion = req.body.descripcion
    objeto.latitud = req.body.latitud
    objeto.longitud = req.body.longitud
    objeto.propietarioId = req.usuario?.id.toString() as string
    try {
        await objeto.save()
        res.json({ message: 'Objeto creado' })
    } catch (error) {
        res.status(500).json({ message: 'Error al crear objeto' })
    }
}