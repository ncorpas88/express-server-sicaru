const router = require("express").Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const { verifyToken, verifyAdmin } = require("../middlewares/auth.middlewares");

// GET ALL PRODUCTS
router.get("/", getProducts);

// GET PRODUCT BY ID
router.get("/:productId", getProductById);

// CREATE PRODUCT (ADMIN ONLY)
router.post("/", verifyToken, verifyAdmin, createProduct);

// UPDATE PRODUCT (ADMIN ONLY)
router.put("/:productId", verifyToken, verifyAdmin, updateProduct);

// DELETE PRODUCT (ADMIN ONLY)
router.delete("/:productId", verifyToken, verifyAdmin, deleteProduct);

module.exports = router;
