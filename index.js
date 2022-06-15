const cookieParser = require("cookie-parser");
const express = require("express");
const connectDB = require("./config/db");
const userModel = require("./models/user");
const app = express();

require("dotenv").config();

connectDB();
app.use(cookieParser());
app.use(express.json());

const employeeRoutes = require("./routes/employee");

app.use("/", employeeRoutes);

const PORT = 4300;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
