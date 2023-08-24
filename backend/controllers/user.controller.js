const {
  UserManufacturer,
  validateManufacturer,
} = require("../models/UserManufacturer");
const {
  UserTransPorter,
  validateTransporter,
} = require("../models/UserTransPorter");

const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwt");

// Manufacturer
const signUpManufacturer = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const { error } = validateManufacturer(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    if (!email || !password) {
      return res.status(400).json("ALL Fields are required");
    }
    const user = await UserManufacturer.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).json("User with given Email Already Exists");
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new UserManufacturer({ ...req.body, password: hashPassword }).save();
    res.status(201).json("UserCreated succesfully");
  } catch (error) {
    res.status(500).json("Internal server Error");
  }
};

const loginManufacturer = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json("All fields are required");
    }
    const user = await UserManufacturer.findOne({ email: req.body.email });
    if (!user) {
      return res.status(409).json("User Not found Please register");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Email or Password");
    }

    const token = await generateToken(user);
    res.status(200).send({ user, token, message: "Logged in Succesful" });
  } catch (error) {
    res.status(500).json("Internal server Error");
  }
};

const getAllManufacturer = async (req, res, next) => {
  try {
    const users = await UserManufacturer.find({}).select(["-password"]);

    if (!users) {
      return res.status(404).json(`User not found`);
    }

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json(error);
  }
};

const signUpTransporter = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const { error } = validateTransporter(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    if (!email || !password) {
      return res.status(400).json("ALL Fields are required");
    }
    const user = await UserTransPorter.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).json("User with given Email Already Exists");
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new UserTransPorter({ ...req.body, password: hashPassword }).save();
    res.status(201).json("UserCreated succesfully");
  } catch (error) {
    res.status(500).json("Internal server Error");
  }
};

const loginTransporter = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json("All fields are required");
    }
    const user = await UserTransPorter.findOne({ email: req.body.email });
    if (!user) {
      return res.status(409).json("User Not found Please register");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Email or Password");
    }

    const token = await generateToken(user);
    res.status(200).send({ user, token, message: "Logged in Succesful" });
  } catch (error) {
    res.status(500).json("Internal server Error");
  }
};

const getAllTransporter = async (req, res, next) => {
  try {
    const users = await UserTransPorter.find({}).select(["-password"]);

    if (!users) {
      return res.status(404).json(`User not found`);
    }

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  signUpManufacturer,
  loginManufacturer,
  getAllManufacturer,
  getAllTransporter,
  loginTransporter,
  signUpTransporter,
};
