import mongoose from 'mongoose';
import Product from '../models/product.model.js';


export const getProducts = async (req, res) => {
  try {

    const products = await Product.find({});
    res.json({data:products});
  } catch (error) {
    console.error(`Error while fetching products: ${error.message}`);
  }
};

export const updatedProduct = async (req, res) => {
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
};

export const deleteProduct = async (req, res) => {
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
    
  } catch (error) {
    console.error(`Error while deleting product: ${error.message}`);
    res.status(500).json({ message: 'Server error while deleting product',error:error.message });
  }
};

export const createProduct=async (req, res) => { 
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

};