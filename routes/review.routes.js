// routes/review.routes.js

const express = require("express")
const router = express.Router()

const Review = require("../models/Review.model")
const Product = require("../models/Product.model")

const { verifyToken } = require("../middlewares/auth.middlewares")

// Obtener todas las reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate("user")
      .populate("product")

    res.status(200).json(reviews)
  } catch (error) {
    next(error)
  }
})

// Obtener review por ID
router.get("/:reviewId", async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId)
      .populate("user")
      .populate("product")

    res.status(200).json(review)
  } catch (error) {
    next(error)
  }
})

// Crear review
router.post("/", verifyToken, async (req, res, next) => {
  try {
    const review = await Review.create({
      ...req.body,
      user: req.payload._id,
    })

    // Agregar review al producto
    await Product.findByIdAndUpdate(review.product, {
      $push: { reviews: review._id },
    })

    res.status(201).json(review)
  } catch (error) {
    next(error)
  }
})

// Actualizar review
router.put("/:reviewId", verifyToken, async (req, res, next) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.reviewId,
      req.body,
      { new: true }
    )

    res.status(200).json(updatedReview)
  } catch (error) {
    next(error)
  }
})

// Eliminar review
router.delete("/:reviewId", verifyToken, async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId)

    // Eliminar referencia en Product
    await Product.findByIdAndUpdate(review.product, {
      $pull: { reviews: review._id },
    })

    await Review.findByIdAndDelete(req.params.reviewId)

    res.status(200).json({
      message: "Review eliminada correctamente",
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router