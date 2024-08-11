import {Request,Response,NextFunction} from 'express'
import { check} from 'express-validator'
import { handleInputErrors } from './handleInputErrors'


//validacion express-validator (esta validacion la estamos haceindo en middleware pero lo podemos hacer en router antes de llegar en el controlador)
export const ValidationProduct =  async (req: Request, res: Response, next: NextFunction) => {
    await check('name').notEmpty().withMessage('El nombre del Procuto no puede ir vacio').run(req) // los metodos del validator exige simpre un await y  para que tenga el efecto le tengo que recuperar los datos del req en RUN
    await check('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El el precio del Procuto no puede ir vacio')
        .custom((value)=> value > 0 ).withMessage('Precio no valido') // puesto customizar mis validaciones ede esta manera
        .run(req) // los metodos del validator exige simpre un await y  para que tenga el efecto le tengo que recuperar los datos del req en RUN
    
    handleInputErrors(req,res,next)

}