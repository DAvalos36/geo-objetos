import { Router } from "express"

//middlewares
import { validarToken } from "../middlewares/login"
import { validarDatos } from "../middlewares/validarDatos"

//controllers
import { mostrarTodosLosObjetosCercanos, schemaCoordenadas, crearObjeto, schemaObjetoCrear } from "../controllers/objetos.controllers"

const router = Router()


router.get('/', validarToken, validarDatos(schemaCoordenadas), mostrarTodosLosObjetosCercanos )
router.post('/', validarToken, validarDatos(schemaObjetoCrear), crearObjeto )

export { router as routerObjetos }