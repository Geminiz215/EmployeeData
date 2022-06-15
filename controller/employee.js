const employeeModel = require("../models/employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const historyModel = require("../models/history1");
const axios = require("axios");

var salt = bcrypt.genSaltSync(10);

const convertToRupiah = (angka) => {
  var rupiah = "";
  var angkarev = angka.toString().split("").reverse().join("");
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
  return (
    "Rp. " +
    rupiah
      .split("", rupiah.length - 1)
      .reverse()
      .join("")
  );
};

const testNIKNAME = async (req, res) => {
  var nik = req.query.nik;
  var nama = req.query.nama.toUpperCase();
  try {
    const findEmployee = await employeeModel.findOne({ NAMA: nama });
    if (findEmployee === null) {
      res
        .status(404)
        .json({ message: "cannot found employee data", result: false });
    } else {
      var hasil = await bcrypt.compare(nik, findEmployee.NIK);

      if (hasil) {
        let resSuccessed = {
          status: "successed",
          result: true,
        };
        var mydata = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        var myip = await axios.get(`https://ipapi.co/json/`);
        var history = {
          user: mydata.username,
          IP: myip.data,
          method: "GET",
          url: "http://localhost:4300/test-PSNOKA-nik-Employee",
          data: resSuccessed,
          query: req.query,
        };
        await historyModel.create(history);
        res.json(resSuccessed);
      } else {
        res.json({
          status: "successed",
          result: false,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ status: "unsuccessed", error: error });
  }
};

const findSalaryByNameNik = async (req, res) => {
  nik = req.query.nik;
  nama = req.query.nama;

  try {
    const EmployeeData = await employeeModel.findOne({ NAMA: nama });

    if (EmployeeData === null) {
      res.status(404).json({
        status: "successed",
        message: "cannot found Employee data",
        return: false,
      });
    } else {
      var resultNik = await bcrypt.compare(nik, EmployeeData.NIK);
      if (resultNik) {
        var gaji = convertToRupiah(EmployeeData.SALARY.GAJI);
        var myip = await axios.get(`https://ipapi.co/json/`);
        var mydata = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        var history = {
          user: mydata.username,
          IP: myip.data,
          method: "GET",
          url: "http://find-Salary-NameNik",
          data: EmployeeData.SALARY,
          query: req.query,
        };
        await historyModel.create(history);
        res.json({
          status: "successed",
          data: EmployeeData.SALARY,
          GAJI: gaji,
          result: true,
        });
      } else {
        res.json({
          status: "unsuccessed",
          result: false,
          message: "the data is not the same",
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.json({ status: "unsuccessed", result: false, error: error });
  }
};

module.exports = {
  testNIKNAME,
  findSalaryByNameNik,
};
