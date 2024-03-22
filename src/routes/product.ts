


import express from 'express'
import  {addProduct,getAllProducts,deleteProduct} from '../controllers/product'
const router = express.Router()


router.post('/addProduct',addProduct)

router.get('/getAllProducts',getAllProducts)

router.delete('/removeProduct/:id',deleteProduct)



export default router  