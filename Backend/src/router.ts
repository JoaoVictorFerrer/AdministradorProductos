import { Router } from 'express'
import { param } from 'express-validator'
import { createProducto, deleteProducto, getByIdProducts, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { ValidationProduct } from './middleware/ValidationProduct'
import { handleInputErrors } from './middleware/handleInputErrors'

const router = Router()

router.get('/', getProducts)

router.get('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getByIdProducts)

router.post('/', ValidationProduct, createProducto)

router.put('/:id',
    param('id').isInt().withMessage('ID no valido'),
    ValidationProduct,
    handleInputErrors,
    updateProduct)

router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability)

router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProducto
 )


export default router