const router = require("express").Router();

const authRoutes = require("./auth.routes");
const productRoutes = require("./product.routes");
const categoryRoutes = require("./category.routes");
const cartRoutes = require("./cart.routes");
const orderRoutes = require("./order.routes");
const paymentRoutes = require("./payment.routes");
const reviewRoutes = require("./review.routes");
const userRoutes = require("./user.routes");

router.use("/auth", authRoutes);

router.use("/products", productRoutes);

router.use("/categories", categoryRoutes);

router.use("/cart", cartRoutes);

router.use("/orders", orderRoutes);

router.use("/payments", paymentRoutes);

router.use("/reviews", reviewRoutes);

router.use("/users", userRoutes);

router.use("/products", productRoutes);

module.exports = router;
