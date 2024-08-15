import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from 'morgan'
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import express from "express";
import router from "./router";
import db from "./config/db";

//conectar a la base de datos

export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log( colors.blue('conexion exitosa a la BD'))
  } catch (error) {
    // console.log(error)
    console.log(colors.red.bold("Hubo un error al conectar a la BD"));
  }
}
connectDB();

//instacia de express
const server = express();

//Permitir conecxiones
//? orgin tomo una funcion con dos argumentos arigin que es el dominio que esta realizando
//? la peticon y callback que es para gestionar las accion despues de saber que dominio esta realizando la peticion

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      // el null es que no hay error y true para permitir la conexion
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};

server.use(cors(corsOptions));

//Morgan

server.use(morgan('dev'))

//Leer datos de formularios
server.use(express.json());

server.use("/api/products", router); // el use contiene todos las peticiones http

server.get("/api", (req, res) => {
  res.json({ msg: "Desde API" });
});

//DOCS

server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
