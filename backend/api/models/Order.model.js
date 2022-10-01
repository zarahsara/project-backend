const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  menu: [{ type: Schema.Types.ObjectId, ref: "Menu" }],
});

module.exports = model("Order", orderSchema);


