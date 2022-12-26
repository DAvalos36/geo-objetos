import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

//Entities
import { Usuario } from "./entities/Usuario";
import { Objeto } from "./entities/Objeto";
import { Encontrado } from "./entities/Encontrado";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Usuario, Objeto, Encontrado],
    subscribers: [],
    migrations: [],
})