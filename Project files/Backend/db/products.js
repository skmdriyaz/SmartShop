// db/product.js

const express = require('express');
const router = express.Router();
const models = require('./schema');

// ✅ Add Product (Admin)
router.post('/api/admin/add-product', async (req, res) => {
  try {
    const { productname, description, price, image, category, countInStock, rating } = req.body;

    // Check for required fields
    if (!productname || !description || !price || !image || !category || !countInStock || !rating) {
      return res.status(400).send({ message: 'Missing required fields' });
    }

    // Check if category exists
    const foundCategory = await models.Category.findOne({ category });
    if (!foundCategory) {
      return res.status(404).send({ message: 'Category not found' });
    }

    // Create new product
    const product = new models.Product({
      productname,
      description,
      price,
      image,
      category: foundCategory.category, // Just use category name string
      countInStock,
      rating,
      dateCreated: new Date()
    });

    await product.save();
    res.status(201).send({ message: 'Product added successfully', product });

  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
