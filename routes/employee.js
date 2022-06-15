const express = require("express");
const jwt = require("jsonwebtoken");
const {
  findEmployeePSNOKA,
  findSalaryByNameNik,
} = require("../controller/employee");
const Login = require("../controller/login");
const router = express.Router();

var validate = function (req, res, next) {
  try {
    jwt.verify(req.cookies.token, process.env.SECRET_KEY);
  } catch (error) {
    return res.status(404).json({ massage: "token dosnt exist" });
  }
  next();
};

router.get("/test-PSNOKA-nik-Employee", validate, findEmployeePSNOKA);
router.get("/find-Salary-NameNik", validate, findSalaryByNameNik);
router.post("/login", Login);

module.exports = router;
