import "reflect-metadata"

import { app } from './app'
import { AppDataSource } from "./db"

async function main() {
    try {
        await AppDataSource.initialize()
        console.log('Database is connected')
        await app.listen(3000)
        console.log('Server is running on port 3000')
    }
    catch {
        console.log("ocurrio un error")
        return
    }
}

main()