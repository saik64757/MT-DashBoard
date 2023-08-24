const { createOrder } = require("../controllers/order.controller");

const router = require("express").Router();

router.post("/create-order", createOrder);

module.exports = router;
