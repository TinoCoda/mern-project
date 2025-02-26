import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import mongoose from 'mongoose';

dotenv.config();


const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Server is ready 123');
});


app.post('/api/products', async (req, res) => { 
    const product= req.body;
    if(!product.name || !product.price || !product.image ){
        return res.status(400).json({success: false,message: 'Please fill all fields'});
    }
    const newProduct= new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    }catch(error){
        console.log(`Error while creating product: ${error.message}`);
    }

});

// Delete a product by id
app.delete('/api/products/:id', async (req, res) => {
  try {
    
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({ sucess:true,message: 'Invalid product id' });
    }
    if (!id) {
      return res.status(400).json({ message: 'Invalid product id' });
    }
     await Product.findByIdAndDelete(id);
    res.status(200).json({success: true, message: 'Product deleted successfully'});
    res.json(deletedProduct);
  } catch (error) {
    console.error(`Error while deleting product: ${error.message}`);
    res.status(500).json({ message: 'Server error while deleting product',error:error.message });
  }
});

// Testing the API using postman or nightingale
// Get all products

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(`Error while fetching products: ${error.message}`);
  }
});

// Modify a product by id
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({ sucess:true,message: 'Invalid product id' });
    }
    if (!id) {
      return res.status(400).json({ message: 'Invalid product id' });
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({success: true,data:updatedProduct});
  } catch (error) {
    console.error(`Error while updating product: ${error.message}`);
    res.status(500).json({ message: 'Server error while updating product' });
  }
});


//console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  connectDB();
  console.log('Server started at http://localhost:5000');
});

// tXpuRJF3mGBHlZhk