import { Router } from "express"

//middlewares
import { validarToken } from "../middlewares/login"
import { validarDatos } from "../middlewares/validarDatos"

//controllers
import { mostrarTodosLosObjetosCercanos, schemaCoordenadas } from "../controllers/objetos.controllers"

const router = Router()


router.get('/', validarToken, validarDatos(schemaCoordenadas), mostrarTodosLosObjetosCercanos )

export { router as routerObjetos }