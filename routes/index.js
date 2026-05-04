const router = require("express").Router();
const userRouter = require("./users");
const clothingRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const auth = require("../middleware/auth");
const { NOT_FOUND } = require("../utils/errors");

router.post("/signin", login);
router.post("/signup", createUser);
router.get("/items", require("../controllers/clothingItems").getClothingItems);

router.use(auth);

router.use("/users", userRouter);
router.use("/items", clothingRouter);

router.use("/users", userRouter);
router.use("/items", clothingRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
