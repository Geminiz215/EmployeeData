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

const resultData = mongoose.Schema({
  queryInsert: {
    nik: String,
    nama: String,
    PSNOK: String,
  },
  dataresult: {
    status: String,
    message: String,
    return: Boolean,
    data: salarySchema,
  },
  TMTUSE: {
    type: Date,
    default: Date.now,
  },
});

const historySchema = mongoose.Schema({
  LoginDate: {
    type: Date,
    default: Date.now,
  },
  LogoutDate: {
    type: Date
  },
  User : String,
  ApiUse: [resultData],
});


const historyModel = mongoose.model("history", historySchema);

// module.exports = historyModel;
