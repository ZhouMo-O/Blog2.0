const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  blogRollName: {
    type: String,
    required: true,
  },
  blogRollAddr: {
    type: String,
    required: true,
  },
  blogRollIcon: {
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

module.exports = mongoose.model("BlogRoll", Schema);
