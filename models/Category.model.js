
const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const Categoy = model("Category", categorySchema);

module.exports = categorySchema; 