const mongoose = require("mongoose");

const User = mongoose.Schema({
    username: {
        type: String,
        max: 10
    },
    password: {
        type: String
    }
})

const userModel = mongoose.model("User", User)
module.exports = userModel