import type { Request, Response } from 'express'
import { number, object, string } from 'yup'

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

    const { latitud, longitud } = req.body

    let objetos: Objeto[]

    try {
        // Nota para el futuro, al utilizar el query builder desde una entidad, se deben de obviar los parametros "from" y "select
        objetos = await Objeto.createQueryBuilder('objeto')
        .addSelect(`6371 * acos(cos(radians(${latitud})) * cos(radians(objeto.latitud)) * cos(radians(objeto.longitud) - radians(${longitud})) + sin(radians(${latitud})) * sin(radians(objeto.latitud)))`, 'distancia')
        .leftJoinAndSelect('objeto.propietario', 'propietario')
        .where(`(6371 * acos(cos(radians(${latitud})) * cos(radians(objeto.latitud)) * cos(radians(objeto.longitud) - radians(${longitud})) + sin(radians(${latitud})) * sin(radians(objeto.latitud)))) <= :distanciamax`, { distanciamax: 10 })
        .getRawMany()
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener objetos cercanos', error })
    }
    

    res.json({ objetos })
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