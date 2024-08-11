import { Router } from 'express'
import { param } from 'express-validator'
import { createProducto, getByIdProducts, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { ValidationProduct } from './middleware/ValidationProduct'
import { handleInputErrors } from './middleware/handleInputErrors'

const router = Router()

router.get('/', getProducts)

router.get('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getByIdProducts)

router.post('/',ValidationProduct,createProducto)
router.put('/:id', updateProduct)
router.patch('/:id',updateAvailability)
router.delete('/', (req, res) => {
    res.json('Desde DELETE')
})


export default router