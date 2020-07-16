const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  passWord: {
    type: String,
    required: true,
    set(val) {
      return require("bcrypt").hashSync(val, 10);
    },
  },
});

module.exports = mongoose.model("User", Schema);
