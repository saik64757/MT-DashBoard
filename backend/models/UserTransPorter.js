const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const UserTransPorterSchema = new mongoose.Schema({
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
  usertype: {
    type: String,
    required: true,
  },
});

UserTransPorterSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const UserTransPorter = mongoose.model(
  "UserTransPorter",
  UserTransPorterSchema
);

const validateTransporter = (data) => {
  const schema = Joi.object({
    userName: Joi.string().required().label("User name"),
    email: Joi.string().required().label("Email"),
    usertype: Joi.string().required().label("User Type"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { UserTransPorter, validateTransporter };
