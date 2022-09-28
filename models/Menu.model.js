const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const menuSchema = new Schema({
  title: String,
  description:String,
  category: String,
  price: Number,
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});


module.exports = model("Menu", menuSchema);