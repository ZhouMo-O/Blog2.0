const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  userNmae: {
    type: String,
  },
  type: {
    type: String,
  },
  content: {
    type: String,
  },
  state: {
    type: Boolean,
  },
  email: {
    type: String,
  },
  createTime: {
    type: String,
    default: () => {
      return new Date().toLocaleString();
    },
  },
  upDateTime: {
    type: String,
    default: () => {
      return new Date().toLocaleString();
    },
  },
});

module.exports = mongoose.model("Message", Schema);
