
const { Schema, model } =
  require("mongoose")

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },

        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "shipped",
        "delivered",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model(
  "Order",
  orderSchema
)