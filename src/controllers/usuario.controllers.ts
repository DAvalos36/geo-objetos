import type { Request, Response } from 'express';
import { object, string } from 'yup'
import { QueryFailedError } from 'typeorm';
import { QueryError } from 'mysql2'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import { Usuario } from '../entities/Usuario';

export const schemaCrearUsuario = object({
    usuario: string().required().min(3).max(30),
    contra: string().required().min(3).max(30),
    nombres: string().required().max(30),
    apellidos: string().required().max(30),
})

export const schemaIniciarSesion = object({
    usuario: string().required().min(3).max(30),
    contra: string().required().min(3).max(30),
})


export const crearUsuario = async (req: Request, res: Response) => {
    console.log(req.body)
    let hash = ''
    try {
        hash = await bcrypt.hash(req.body.contra, 10)
    } catch (error) {
        return res.status(500)
    }

    const usuarioInfo = req.body
    const usuario = new Usuario()
    usuario.usuario = usuarioInfo.usuario
    usuario.contra = hash
    usuario.nombres = usuarioInfo.nombres
    usuario.apellidos = usuarioInfo.apellidos

    try {
        await usuario.save()
        console.log(usuario)
    } catch (error: QueryFailedError | any ) {
        if(error instanceof QueryFailedError){
            console.log(error)
            const e = error.driverError as QueryError
            if(e.code === 'ER_DUP_ENTRY'){
                return res.status(409).json({ message: 'Ya existe un usuario con este nombre', e })
            }
        }
        return res.status(500).json({ message: 'Error al crear usuario' })
    }
    res.json({ message: 'Usuario creado' });
}

export const iniciarSesion = async (req: Request, res: Response) => {
    const usuario = await Usuario.findOneBy({usuario: req.body.usuario})
    if(usuario != null){
        const cmp = await bcrypt.compare(req.body.contra, usuario.contra)
        if(cmp){

            const token = jwt.sign({ 
                id: usuario.id, 
                usuario: usuario.usuario, 
                nombres: usuario.nombres, 
                apellidos: usuario.apellidos  }, 
            process.env.JWT_SECRET as string,
            { expiresIn: '30 days' }
            )
            return res.json({ message: 'Bienvenido', token })
        }
        return res.status(401).json({ message: 'Contraseña incorrecta' })
    }

    res.status(404).json({ message: 'Usuario no encontrado' })
}