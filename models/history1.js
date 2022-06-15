const mongoose = require("mongoose");

const query = mongoose.Schema({
  nik: String,
  nama: {
    type: String,
    uppercase: true
  },
  PSNOK: String,
});

const salarySchema = mongoose.Schema({
  status: String,
  result: Boolean,
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




const IPSchema = mongoose.Schema({
  ip: String,
  version: String,
  city: String,
  region: String,
  country: String,
  country_name: String,
  timezone: String,
  asn: String,
  org: String
})

const historySchema = mongoose.Schema({
  user: String,
  date: { type: Date, default: Date.now },
  IP: IPSchema,
  method: String,
  url: String,
  data: salarySchema,
  query: query,
  
});

const historyModel = mongoose.model("history", historySchema);

module.exports = historyModel;
