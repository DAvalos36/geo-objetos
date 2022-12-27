import { Router } from "express"


//controllers
import { crearUsuario, schemaCrearUsuario } from "../controllers/usuario.controllers"


import { validarDatos } from "../middlewares/validarDatos"



const router = Router()

router.post('/registro', validarDatos(schemaCrearUsuario) ,crearUsuario )
router.post('/login', crearUsuario )


export { router as routerUsuarios }