const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  avtor: {
    type: String,
  },
  content: {
    type: String,
  },
  email: {
    type: String,
  },
  site: {
    type: String,
  },
  time: {
    type: String,
  },
  blogId: {
    type: String,
  },
  istopComment: {
    type: Boolean,
  },
  replyId: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "comment",
    },
  ],
});
module.exports = mongoose.model("comment", Schema);
