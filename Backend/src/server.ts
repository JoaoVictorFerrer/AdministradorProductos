import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
import express from 'express'
import router from './router'
import db from './config/db'

//conectar a la base de datos

export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log( colors.blue('conexion exitosa a la BD'))
    } catch (error) {
        // console.log(error)
        console.log(colors.red.bold('Hubo un error al conectar a la BD'))
    }
}
connectDB()
//instacia de express
const server = express()

//Leer datos de formularios
server.use(express.json())

server.use('/api/products', router) // el use contiene todos las peticiones http

server.get('/api', (req, res) => {
    res.json({msg:'Desde API'})
})

//DOCS

server.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))

export default server