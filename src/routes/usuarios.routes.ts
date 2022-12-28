import { Router } from "express"


//controllers
import { crearUsuario, schemaCrearUsuario, schemaIniciarSesion, iniciarSesion } from "../controllers/usuario.controllers"


import { validarDatos } from "../middlewares/validarDatos"



const router = Router()

router.post('/registro', validarDatos(schemaCrearUsuario) ,crearUsuario )
router.post('/login', validarDatos(schemaIniciarSesion), iniciarSesion )


export { router as routerUsuarios }