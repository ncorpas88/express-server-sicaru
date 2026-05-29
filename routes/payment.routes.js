const express = require("express")

const router = express.Router()

const {
  createPayment,
  getPayments,
  getPaymentById,
  updatePaymentStatus,
  deletePayment,
} = require("../controllers/payment.controller")

const {
  verifyToken,
  verifyAdmin,
} = require("../middlewares/auth.middlewares")

// Crear pago
router.post(
  "/",
  verifyToken,
  createPayment
)

// Obtener pagos
router.get(
  "/",
  verifyToken,
  verifyAdmin,
  getPayments
)

// Obtener pago por ID
router.get(
  "/:id",
  verifyToken,
  getPaymentById
)

// Actualizar pago
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  updatePaymentStatus
)

// Eliminar pago
router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  deletePayment
)

module.exports = router