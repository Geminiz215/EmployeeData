const mongoose = require("mongoose");

const salarySchema = mongoose.Schema({
  TMTGAJI: {
    type: Date,
  },
  GAJI: {
    type: Number,
  },
  TSINPUT: {
    type: Date,
  },
  TSUPDATE: {
    type: Date,
  },
  FLAGUMK: {
    type: Number,
  },
  TSMOVE: {
    type: Date,
  },
});

const employeeSchema = mongoose.Schema({
  SALARY: salarySchema,
  PSNOKA: {
    type: String,
    unique: true,
  },
  NAMA: {
    type: String,
    uppercase: true,
  },
  NMCETAK: {
    type: String,
  },
  JENKEL: {
    type: String,
  },
  FLAGTANGGUNGAN: {
    type: Number,
  },
  NOHP: {
    type: String,
  },
  NIK: {
    type: String,
  },
  NOKTP: {
    type: String,
  },
  NPWP: {
    type: String,
  },
  NOKA: {
    type: String,
  },
});

const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = employeeModel;
