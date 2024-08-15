const Product = require('../models/Product');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { title, description, cost } = req.body;
    const imageUrl = req.file.path; // Assuming multer middleware stores the image path in req.file.path

    const product = new Product({
      seller: req.user.id,
      title,
      description,
      cost,
      imageUrl,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error });
  }
};

// Get products of the logged-in user
exports.getUserProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        // .populate('seller', 'name');
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching all products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all products


// Get product details by ID
exports.getProductDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product details', error });
  }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Optionally, you can delete the image from Cloudinary if applicable
        if (product.imageUrl) {
            const publicId = product.imageUrl.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, cost } = req.body;
  
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      if (req.user.id !== product.seller.toString()) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      // Update product fields
      product.title = title || product.title;
      product.description = description || product.description;
      product.cost = cost || product.cost;
  
      // If a new image is uploaded, delete the old one and update the imageUrl
      if (req.file) {
        if (product.imageUrl) {
          const publicId = product.imageUrl.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(publicId);
        }
        product.imageUrl = req.file.path;
      }
  
      await product.save();
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update product', error });
    }
  };