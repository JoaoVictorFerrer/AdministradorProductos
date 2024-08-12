import { Request, Response } from "express"
import Product from "../models/Product.models"


export const getProducts = async (req : Request, res : Response ) => {
   try {
    
       const products = await Product.findAll({
        //    order: [
        //        ['price', 'ASC'] //que me traiga los datos de menor a mayor y DESC de mayor a menor  ,
        //    ],
        //    limit: 2
       })
       res.json({ data: products })
    
   } catch (error) {
    console.log(error)
   }
}
export const getByIdProducts = async (req : Request, res : Response ) => {
   try {
       const { id } = req.params
       const product = await Product.findByPk(id)

       if (!product) {
           return res.status(404).json({error:'producto no encontrado'})
       }

       res.json({data:product})
   } catch (error) {
    console.log(error)
   }
}


export const createProducto = async (req : Request, res : Response ) => {
    //?Una forma de hacerlo
    // const product = new Product(req.body)
    // const savedProduct = await product.save()
    // res.json({data:savedProduct})

    //? Otra forma mas limpia
    try {
        
        const product = await Product.create(req.body)
        res.status(201).json({data:product})
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {

        //Compruebo si existe el producto
        const { id } = req.params
        const product = await Product.findByPk(id)
 
        if (!product) {
            return res.status(404).json({error:'producto no encontrado'})
        }

        //actualizo los datos

        await product.update(req.body) // el put deberia cambiar todo el registro con la informacion enviada pero el update restringe esa funcionalidad y solo actualizar lo que recibe actuando como patch
        await product.save() // despues de actualizarlo lo guardo en la BBDD
 
        res.json({data:product})
    } catch (error) {
        console.log(error)
    }
}
export const updateAvailability = async (req: Request, res: Response) => {
    try {

        //Compruebo si existe el producto
        const { id } = req.params
        const product = await Product.findByPk(id)
 
        if (!product) {
            return res.status(404).json({error:'producto no encontrado'})
        }

        //actualizo los datos
        // console.log(product.dataValues.availability)
        product.availability = !product.dataValues.availability // en vez de utilizarr el update() y mandar el dato por el body ya le asigno a ese campo el valor contrario que tiene en base de datos accediendo atraves de dataValues.
        await product.save() // despues de actualizarlo lo guardo en la BBDD
 
        res.json({data:product})
    } catch (error) {
        console.log(error)
    }
}

export const deleteProducto = async (req: Request, res: Response) => {
    try {

        //Compruebo si existe el producto
        const { id } = req.params
        const product = await Product.findByPk(id)
 
        if (!product) {
            return res.status(404).json({error:'producto no encontrado'})
        }

        //Elimino el registro
       
       await product.destroy()
       res.json({ data: 'Producto Eliminado' })
        
    } catch (error) {
        console.log(error)
    }
}