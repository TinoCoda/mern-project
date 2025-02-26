import express from 'express';


import { createProduct, getProducts,updatedProduct , deleteProduct} from '../controllers/product.controller.js';

const router = express.Router();

router.post("/",createProduct); // Create a product);
router.get("/", getProducts); //  Read all products
router.put("/:id",updatedProduct);
router.delete("/:id", deleteProduct); // Delete a product by id











export default router;
