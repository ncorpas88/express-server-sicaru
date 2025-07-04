const { Schema, model, Types } = require("mongoose");

const productShema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Ropa", "Accesorios", "Calzado", "Alimentacion", "Cocina", "Otros"],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  raiting: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: [
    {
      type: Types.ObjectId,
      ref: "Review",
    },
  ],
  createdBy: {
    type: Types.ObjectId,
    REF: "User",
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
},
{timestamps: true,}
);

const Product = model("Product", productShema);

module.exports = Product;
