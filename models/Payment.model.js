
const { Schema, model, Types } = require("mongoose");

const paymentShema = new Schema(
    {
        order: {
            type: Types.ObjectId,
            ref: "Order",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        method: {
            type: String,
            enum: ["targeta", "paypal", "transferencia", "otro"],
            required: true,
        },
        status: {
            type: String,
            enum: ["pendiemte", "confirmado", "fallido"],
            default: "pendiente",
        },
        paidAt: {
            type: Date,
        },
    },
    {timestamps: true}
);

const Payment = model("Payment", paymentShema);

module.exports = Payment;