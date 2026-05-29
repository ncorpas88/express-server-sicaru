const Product = require("../models/Product.model")

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("createdBy")

    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
}

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
      .populate("category")
      .populate("createdBy")
      .populate("reviews")

    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
}

exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.payload._id,
    })

    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
}

exports.updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    )

    res.status(200).json(updatedProduct)
  } catch (error) {
    next(error)
  }
}

exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.productId)

    res.status(200).json({
      message: "Producto eliminado correctamente",
    })
  } catch (error) {
    next(error)
  }
}