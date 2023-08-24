const ShippingOrder = require("../models/Order");

const createOrder = async (req, res) => {
  console.log(req.body);
  try {
    const newOrder = new ShippingOrder({ ...req.body });
    await newOrder.save();
    // // Emit a socket event to notify Transporter about the new order
    // io.emit("new-order", newOrder);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrder,
};
