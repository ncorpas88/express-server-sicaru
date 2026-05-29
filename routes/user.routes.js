// routes/user.routes.js

const express = require("express")
const router = express.Router()

const User = require("../models/User.model")

const {
  verifyToken,
  verifyAdmin,
} = require("../middlewares/auth.middlewares")

// Obtener todos los usuarios
router.get("/", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const users = await User.find().select("-password")

    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
})

// Obtener usuario autenticado
router.get("/profile/me", verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.payload._id).select("-password")

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

// Obtener usuario por ID
router.get("/:userId", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).select("-password")

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

// Actualizar usuario
router.put("/:userId", verifyToken, async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    ).select("-password")

    res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
})

// Eliminar usuario
router.delete(
  "/:userId",
  verifyToken,
  verifyAdmin,
  async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.params.userId)

      res.status(200).json({
        message: "Usuario eliminado correctamente",
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router