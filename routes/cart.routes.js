const express = require("express")
const router = express.Router()

const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateCartItem,
} = require("../controllers/cart.controller")

const {
  verifyToken,
} = require("../middlewares/auth.middlewares")

// Obtener carrito
router.get(
  "/",
  verifyToken,
  getCart
)

// Agregar producto
router.post(
  "/add",
  verifyToken,
  addToCart
)

// Actualizar cantidad
router.put(
  "/update/:productId",
  verifyToken,
  updateCartItem
)

// Eliminar producto
router.delete(
  "/remove/:productId",
  verifyToken,
  removeFromCart
)

// Vaciar carrito
router.delete(
  "/clear",
  verifyToken,
  clearCart
)

module.exports = router