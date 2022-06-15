const Validator = require("fastest-validator");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const v = new Validator();

const Login = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  const schema = {
    username: { type: "string", min: 3, max: 100 },
    password: { type: "string", min: 3, max: 100 },
  };

  const validate = v.validate(req.body, schema);

  if (validate.length > 0) {
    return res.status(400).json(validate);
  }

  var User = await userModel.findOne({ username: username });

  if (username === User.username && password === User.password) {
    let token = jwt.sign({ username: User.username }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    await res.cookie("token", token, { httpOnly: true });

    res.json({ status: 200, payload: token, message: "berhasil login" } || {});
  } else {
    res.send("gagal");
  }
};

const Logout = async (req, res) => {
  res.cookie("token", "", { httpOnly: true });
  res.json({ message: "token already destroy" });
};

module.exports = { Login, Logout };
