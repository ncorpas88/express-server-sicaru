
const Payment = require("../models/Payment.model")

exports.createPayment = async (
  req,
  res,
  next
) => {
  try {
    const payment =
      await Payment.create({
        ...req.body,
        user: req.payload._id,
      })

    res.status(201).json(payment)
  } catch (error) {
    next(error)
  }
}

exports.getPayments = async (
  req,
  res,
  next
) => {
  try {
    const payments =
      await Payment.find().populate(
        "user"
      )

    res.status(200).json(payments)
  } catch (error) {
    next(error)
  }
}

exports.getPaymentById = async (
  req,
  res,
  next
) => {
  try {
    const payment =
      await Payment.findById(
        req.params.id
      ).populate("user")

    res.status(200).json(payment)
  } catch (error) {
    next(error)
  }
}

exports.updatePaymentStatus =
  async (req, res, next) => {
    try {
      const updatedPayment =
        await Payment.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        )

      res
        .status(200)
        .json(updatedPayment)
    } catch (error) {
      next(error)
    }
  }

exports.deletePayment = async (
  req,
  res,
  next
) => {
  try {
    await Payment.findByIdAndDelete(
      req.params.id
    )

    res.status(200).json({
      message:
        "Pago eliminado correctamente",
    })
  } catch (error) {
    next(error)
  }
}