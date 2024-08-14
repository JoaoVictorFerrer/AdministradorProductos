
import { exit } from 'node:process'
import db from '../config/db'

const clearDB = async () => {
    try {
        await db.sync({ force: true })
        console.log('Datos eliminados correctamente')
        exit(0) // coin el 0 o sin nada significa que finalizo corretamente el codigo 
    } catch (error) {
        console.log(error)
        exit(1) // el 1 significa que finaliza el codigo apesar de que tenga errores
    }
}

if (process.argv[2] === '--clear') {
    clearDB()
}

// console.log(process.argv) es utiliza este vector para utilizar el CLine del packjason el codigo de pretest se ejecuanta antes y el postest se ejecuta despues en packJason