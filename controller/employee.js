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

const findEmployeePSNOKA = async (req, res) => {
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
        var resSuccessed = {
          status: "successed",
          data: EmployeeData.SALARY,
          GAJI: gaji,
          result: true,
        };
        var history = {
          user: mydata.username,
          IP: myip.data,
          method: "GET",
          url: "http://find-Salary-NameNik",
          data: resSuccessed,
          query: req.query,
        };
        await historyModel.create(history);
        res.json(resSuccessed);
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

//di luar konteks
const findSalaryByPSNOKA = async (req, res) => {
  var nik = req.query.nik;
  try {
    const findSalary = await employeeModel.findOne({ NIK: nik });

    if (findSalary) {
      res.json({
        message: "successed",
        data: findSalary.SALARY,
        GAJI: convertToRupiah(findSalary.SALARY.GAJI),
      });
    } else {
      res.json({
        message: `unsuccessed, can't find data`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "unsuccessed", error: error });
  }
};

const updateNIK = async (req, res) => {
  const psnoka = req.params.psnoka;
  try {
    var hashValue = bcrypt.hashSync(req.query.nik, salt);
    var value = hashValue;
    const Employee = await employeeModel.findOne({PSNOKA: psnoka})
    Employee.NIK = value
    await Employee.save()
    if (Employee) {
      // res.send("Successfull");
      res.json({message: "successed", data: Employee.NIK})
    } else {
      res.status(500).send("Not successfull");
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: error });
  }
};

module.exports = {
  findEmployeePSNOKA,
  findSalaryByPSNOKA,
  updateNIK,
  findSalaryByNameNik,
};
