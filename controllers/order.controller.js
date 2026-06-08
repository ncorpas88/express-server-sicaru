
const Order = require("../models/Order.model")

exports.createOrder = async (
  req,
  res,
  next
) => {
  try {
    const order = await Order.create({
      ...req.body,
      user: req.payload._id,
    })

    res.status(201).json(order)
  } catch (error) {
    next(error)
  }
}

exports.getOrders = async (
  req,
  res,
  next
) => {
  try {
    const orders = await Order.find()
      .populate("user")

    res.status(200).json(orders)
  } catch (error) {
    next(error)
  }
}

exports.getOrderById = async (
  req,
  res,
  next
) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      ).populate("user")

    res.status(200).json(order)
  } catch (error) {
    next(error)
  }
}

exports.getMyOrders = async (
  req,
  res,
  next
) => {
  try {
    const orders = await Order.find({
      user: req.payload._id,
    })
      .populate("products.product")
      .sort({ createdAt: -1 })

    res.status(200).json(orders)
  } catch (error) {
    next(error)
  }
}

exports.updateOrderStatus =
  async (req, res, next) => {
    try {
      const updatedOrder =
        await Order.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        )

      res
        .status(200)
        .json(updatedOrder)
    } catch (error) {
      next(error)
    }
  }

exports.deleteOrder = async (
  req,
  res,
  next
) => {
  try {
    await Order.findByIdAndDelete(
      req.params.id
    )

    res.status(200).json({
      message:
        "Orden eliminada correctamente",
    })
  } catch (error) {
    next(error)
  }
}