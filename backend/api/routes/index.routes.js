const router = require("express").Router();
const menuRouter = require("./menu.routes");
const orderRouter = require("./order.routes");
const authRouter = require("./auth.routes");
const { isAuthenticated } = require("../middleware/jwt.middleware");
router.get("/", (req, res, next) => {
  res.json("All good in here");
});




router.use("/menus", isAuthenticated,menuRouter);
router.use("/orders", orderRouter);
router.use("/auth", authRouter);



// You put the next routes here 👇
// example: router.use("/auth", authRoutes)


module.exports = router;
