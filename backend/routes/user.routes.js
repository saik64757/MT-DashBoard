const router = require("express").Router();
const {
  signUpManufacturer,
  loginManufacturer,
  getAllManufacturer,
  getAllTransporter,
  loginTransporter,
  signUpTransporter,
} = require("../controllers/user.controller");

router.post("/register/manufacturer", signUpManufacturer);
router.post("/register/transporter", signUpTransporter);
router.post("/login/manufacturer", loginManufacturer);
router.post("/login/transporter", loginManufacturer);
router.get("/get-allManufacturers", getAllManufacturer);
router.get("/get-allTransporters", getAllTransporter);

module.exports = router;
