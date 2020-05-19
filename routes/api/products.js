const express = require('express');
const router = express.Router();

const ProductsService = require('../../services/products');
const validation = require('../../utils/middleware/validationHandler');
const {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema,
} = require('../../utils/schemas/products')

const productService = new ProductsService();
router.get('/', async function(req, res, next) {
  const { tags } = req.query;
  try {
    const products = await productService.getProducts({ tags });
    res.status(200).json({
      data: products,
      message: 'products listed!'
    });
  } catch (err) {
    next(err);
  }
});

// url param antepuesto a los :
router.get('/:productId', async function(req, res, next) {
  const { productId } = req.params;

  try {
    const product = await productService.getProduct({ productId });

    res.status(200).json({
      data: product,
      message: 'product retrieved'
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', validation(createProductSchema), 
  async function(req, res, next) {
    const { body: product } = req;

    try {
      const createdProduct = await productService.createProduct({ product });

      res.status(201).json({
        data: createdProduct,
        message: 'product created'
      });
    } catch (err) {
      next(err);
    }
  }
);

router.put(
    '/:productId', 
    validation({ productId: productIdSchema }, 'params'),
    validation(updateProductSchema),
    async function(req, res, next) {
  const { productId } = req.params;
  const { body: product } = req;
  try {
    const updatedProduct = productService.updateProduct({ productId, product });
    res.status(200).json({
      data: updatedProduct,
      message: 'products updated'
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:productId', async function(req, res, next) {
  const { productId } = req.params;

  try {
    const product = productService.deleteProduct({ productId });

    res.status(200).json({
      data: product,
      message: 'products deleted'
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;