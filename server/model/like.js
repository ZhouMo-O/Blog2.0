const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  articleId: {
    type: String,
    required: true,
  },
  userIp: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Like", Schema);
