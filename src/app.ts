import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

//routes
import { routerUsuarios } from './routes/usuarios.routes'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

//routes
app.use('/usuarios', routerUsuarios)

export {app}