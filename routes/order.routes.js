const express = require("express")

const router = express.Router()

const {
  createOrder,
  getOrders,
  getOrderById,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/order.controller")

const {
  verifyToken,
  verifyAdmin,
} = require("../middlewares/auth.middlewares")

// Crear orden
router.post(
  "/",
  verifyToken,
  createOrder
)

// Órdenes del usuario
router.get(
  "/my-orders",
  verifyToken,
  getMyOrders
)

// Todas las órdenes
router.get(
  "/",
  verifyToken,
  verifyAdmin,
  getOrders
)

// Orden por ID
router.get(
  "/:id",
  verifyToken,
  getOrderById
)

// Actualizar orden
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  updateOrderStatus
)

// Eliminar orden
router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  deleteOrder
)

module.exports = router