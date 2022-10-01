const mongoose = require("mongoose");
const Menu = require("../models/Menu.model");
const Order = require("../models/Order.model");
const router = require("express").Router();

router.post("/", (req, res, next) => {
    const { title, description , category, price } = req.body;
    
    Menu.create({ title, description, category, price, orders: [] })
      .then((value) => res.status(201).json(value))
      .catch((err) => {
        res.json(err);
      });
  });

  router.get("/", (req, res, next) => {
    Menu.find()
      .populate("orders")
      .then((projects) => {
        res.json(projects);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.get("/:menuId", (req, res, next) => {
    const { menuId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(menuId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    Menu.findById(menuId)
    .populate("orders")
    .then((value) => res.json(value))
    .catch((err) => res.json(err));
});


router.put("/:menuId", (req, res, next) => {
  const { menuId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(menuId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Menu.findByIdAndUpdate(menuId, req.body, { new: true })
  .then((value) => {
    res.json(value);
  })
  .catch((err) => res.json(err));
});




router.delete("/:menuId", (req, res, next) => {
  const { menuId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(menuId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }


  Menu.findByIdAndRemove(menuId)
  .then(() => {
    res.json({ message: `Deleted menu with id ${menuId}` });
  })
  .catch((err) => res.json(err));
});


  module.exports = router;