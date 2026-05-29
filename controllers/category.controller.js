const Category = require("../models/Category.model")

exports.getCategories = async (
  req,
  res,
  next
) => {
  try {
    const categories =
      await Category.find()

    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
}

exports.getCategoryById = async (
  req,
  res,
  next
) => {
  try {
    const category =
      await Category.findById(
        req.params.id
      )

    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
}

exports.createCategory = async (
  req,
  res,
  next
) => {
  try {
    const category =
      await Category.create(req.body)

    res.status(201).json(category)
  } catch (error) {
    next(error)
  }
}

exports.updateCategory = async (
  req,
  res,
  next
) => {
  try {
    const updatedCategory =
      await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )

    res
      .status(200)
      .json(updatedCategory)
  } catch (error) {
    next(error)
  }
}

exports.deleteCategory = async (
  req,
  res,
  next
) => {
  try {
    await Category.findByIdAndDelete(
      req.params.id
    )

    res.status(200).json({
      message:
        "Categoría eliminada correctamente",
    })
  } catch (error) {
    next(error)
  }
}