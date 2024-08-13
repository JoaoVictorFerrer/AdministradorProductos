import { Router } from 'express'
import { param } from 'express-validator'
import { createProducto, deleteProducto, getByIdProducts, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { ValidationProduct } from './middleware/ValidationProduct'
import { handleInputErrors } from './middleware/handleInputErrors'

const router = Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor curvo
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 200
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *               - Products
 *          description: Return a list of products
 *          responses:
 *               200:
 *                   description: successful response
 *                   content:
 *                        aplication/json:
 *                             schema:
 *                                type: array
 *                                items:
 *                                       $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *      summary: Get a product by ID
 *      tags: 
 *           - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *      
 *         - in: path
 *           name: id
 *           description: The ID of the product to retrieve
 *           requiere: true
 *           schema:
 *              type: integer
 *      responses: 
 *          200:
 *              description: Successful Response
 *              content:
 *                 aplication/json: 
 *                      schema:
 *                              $ref: '#/components/schemas/Product'
 *
 *          404: 
 *              description: Not Found
 *          400:
 *              description: Bad Request - Invalid ID
 */

/**
 * @swagger
 *  /api/products:
 *         post: 
 *          summary: Creates a new product
 *          tags:
 *              - Products
 *          description: Returns a new record in the dataBase
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  name:
 *                                      type: string
 *                                      example: 'Monitor de 24 pulgadas'
 *                                  price:
 *                                       type: number     
 *                                       example: 123                              
 *          responses:      
 *              201:
 *                  description: Product created successfully
 *              400:    
 *                  description: Bad - Request - Invalid input data
 */

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input 
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *         - in: path
 *           name: id
 *           description: The ID of the product to retrieve
 *           requiere: true
 *           schema:
 *              type: integer
 *      requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  name:
 *                                      type: string
 *                                      example: 'Monitor de 24 pulgadas'
 *                                  price:
 *                                       type: number     
 *                                       example: 123
 *                                  availability:
 *                                       type: boolean
 *                                       example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Product' 
 *          400:
 *              description: Bad Reques - Invalid ID or Invalid input data
 *          404:  
 *              description: Bad request
 * 
 * 
 */

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Product availability
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *         - in: path
 *           name: id
 *           description: The ID of the product to retrieve
 *           requiere: true
 *           schema:
 *              type: integer  
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Product' 
 *          400:
 *              description: Bad Reques - Invalid ID 
 *          404:  
 *              description: Bad request
 */

/**
 * @swagger
 * /api/products/{id}:
 * 
 *   delete:
 *      summary: Delete Product
 *      tags: 
 *         - Products
 *      description: Returns a confirmation message 
 *      parameters:
 *         - in: path
 *           name: id
 *           description: The ID of the product to retrieve
 *           requiere: true
 *           schema:
 *              type: integer  
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema:
 *                             type: string
 *                             value: 'Producto Eliminado'
 *          400:
 *              description: Bad Reques - Invalid ID 
 *          404:  
 *              description: Bad request
 */
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