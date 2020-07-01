const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  articleId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  userIp: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("like", Schema);
