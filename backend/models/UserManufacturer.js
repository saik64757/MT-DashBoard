const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const UserManufacturerSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  usertype: {
    type: String,
    required: true,
  },
});

UserManufacturerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const UserManufacturer = mongoose.model(
  "UserManufacturer",
  UserManufacturerSchema
);

const validateManufacturer = (data) => {
  const schema = Joi.object({
    userName: Joi.string().required().label("User name"),
    email: Joi.string().required().label("Email"),
    usertype: Joi.string().required().label("User Type"),
    password: passwordComplexity().required().label("Password"),
    address: Joi.required().label("Address"),
  });
  return schema.validate(data);
};

module.exports = { UserManufacturer, validateManufacturer };
