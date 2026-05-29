const Product = require("../models/Product.model");

// GET ALL PRODUCTS
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// GET PRODUCT BY ID
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// CREATE PRODUCT
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      },
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);

    res.status(200).json({
      message: "Producto eliminado",
    });
  } catch (error) {
    next(error);
  }
};
