import { Request,Response } from "express"



export const createProducto = (req : Request, res : Response ) => {

    res.json('Desde POST')
}