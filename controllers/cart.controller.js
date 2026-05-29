
const User = require("../models/User.model")

exports.getCart = async (req, res, next) => {
  try {
    const user = await User.findById(
      req.payload._id
    ).populate("cart.product")

    res.status(200).json(user.cart)
  } catch (error) {
    next(error)
  }
}

exports.addToCart = async (
  req,
  res,
  next
) => {
  try {
    const { productId, quantity } =
      req.body

    const user = await User.findById(
      req.payload._id
    )

    const existingProduct =
      user.cart.find(
        (item) =>
          item.product.toString() ===
          productId
      )

    if (existingProduct) {
      existingProduct.quantity +=
        quantity || 1
    } else {
      user.cart.push({
        product: productId,
        quantity: quantity || 1,
      })
    }

    await user.save()

    res.status(200).json(user.cart)
  } catch (error) {
    next(error)
  }
}

exports.updateCartItem = async (
  req,
  res,
  next
) => {
  try {
    const { quantity } = req.body

    const user = await User.findById(
      req.payload._id
    )

    const cartItem = user.cart.find(
      (item) =>
        item.product.toString() ===
        req.params.productId
    )

    if (cartItem) {
      cartItem.quantity = quantity
    }

    await user.save()

    res.status(200).json(user.cart)
  } catch (error) {
    next(error)
  }
}

exports.removeFromCart = async (
  req,
  res,
  next
) => {
  try {
    const user = await User.findById(
      req.payload._id
    )

    user.cart = user.cart.filter(
      (item) =>
        item.product.toString() !==
        req.params.productId
    )

    await user.save()

    res.status(200).json(user.cart)
  } catch (error) {
    next(error)
  }
}

exports.clearCart = async (
  req,
  res,
  next
) => {
  try {
    const user = await User.findById(
      req.payload._id
    )

    user.cart = []

    await user.save()

    res.status(200).json({
      message:
        "Carrito vaciado correctamente",
    })
  } catch (error) {
    next(error)
  }
}