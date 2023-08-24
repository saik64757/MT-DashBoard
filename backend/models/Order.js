const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema({
  orderid: {
    type: String,
    required: true,
    unique: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  pickup: {
    type: String,
    required: true,
  },
  transporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserTransPorter",
  },
});

const validate = () => {
  const schema = Joi.object({
    orderid: Joi.string().required().label("Order ID"),
    from: Joi.string().required().label(" From : Source of the pickup"),
    to: Joi.string()
      .required()
      .label("To : Destination of where the goods are meant to be"),
    from: Joi.string().required().label(" From : Source of the pickup"),
    quantity: Joi.number().required().label("Quantity"),
  });
};

const ShippingOrder = mongoose.model("ShippingOrder", orderSchema);

module.exports = ShippingOrder;
