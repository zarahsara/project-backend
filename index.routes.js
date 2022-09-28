const router = require("express").Router();
const menuRouter = require("./menu.routes");
const orderRouter = require("./order.routes");
router.get("/", (req, res, next) => {
  res.json("All good in here");
});




router.use("/menus", menuRouter);
router.use("/orders", orderRouter);


// You put the next routes here 👇
// example: router.use("/auth", authRoutes)



module.exports = router;
