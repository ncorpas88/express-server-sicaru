
const { Shema, model, Types } = require("mongoose");

const cartShema = new Shema(
    {
        user: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [
            {
                pruduct: {
                    type: Types.ObjectId,
                    ref: "Product",
                    requred: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                min:1,                
            },
            },
        ],
    },
    { timestamps: true }
);

const Cart = model("Cart", cartShema);

module.exports = Cart;