const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  title: {
    type: String,
  },
  markdown: {
    type: String,
  },
  html: {
    type: String,
  },
  Intro: {
    type: String,
  },
  like: {
    type: Number,
    default: 0,
  },
  read: {
    type: Number,
    default: 0,
  },
  comment: {
    type: Array,
    default: 0,
  },
  privacy: {
    type: Boolean,
    default: false,
  },
  parent: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "tag",
    },
  ],
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

module.exports = mongoose.model("article", Schema);
