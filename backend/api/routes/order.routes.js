const mongoose = require("mongoose");
const router = require("express").Router();

const Order = require("../models/Order.model");
const Menu = require("../models/Menu.model");

router.post("/", (req, res, next) => {
const { title, description , price, menuId} = req.body;

Order.create({title, description, price, menu: menuId})
.then((order) => {
return Menu.findByIdAndUpdate(
menuId,
{
    $push: {orders: order._id },
},
{new: true}
);
})
.then((value) => {
    res.json(value);
  })
  .catch((err) => {
    res.json(err);
  });
});

module.exports = router;
