const express = require("express")
const router = express.Router()

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller")

const {
  verifyToken,
  verifyAdmin,
} = require("../middlewares/auth.middlewares")

// Obtener todas las categorías
router.get("/", getCategories)

// Obtener categoría por ID
router.get("/:id", getCategoryById)

// Crear categoría
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  createCategory
)

// Actualizar categoría
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  updateCategory
)

// Eliminar categoría
router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  deleteCategory
)

module.exports = router