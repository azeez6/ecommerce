const express = require('express');
const { createProduct, getUserProducts, getAllProducts, getProductDetail, deleteProduct, updateProduct } = require('../controllers/productController');
const authMiddleware  = require('../middleware/authMiddleware');
const verifyAdmin  = require('../middleware/authMiddleware');
const upload = require('../config/multer');
const router = express.Router();

router.post('/', authMiddleware,
     upload.single('image'), 
     createProduct);
router.get('/user', authMiddleware, getUserProducts);
router.get('/',verifyAdmin, getAllProducts);
router.get('/:id', getProductDetail);
router.delete('/:id', authMiddleware, deleteProduct);
router.put('/:id', authMiddleware, upload.single('image'), updateProduct);


module.exports = router;
