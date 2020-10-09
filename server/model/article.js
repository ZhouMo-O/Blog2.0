const mongoose = require("mongoose");
const moment = require("moment");
const Schema = new mongoose.Schema(
  {
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
    cover: {
      type: String,
      default: "https://api.ixiaowai.cn/gqapi/gqapi.php",
    },
    read: {
      type: Number,
      default: 0,
    },
    comment: {
      type: Number,
      default: 0,
    },
    privacy: {
      type: Boolean,
      default: false,
    },
    relatedTag: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Tag",
      },
    ],
    createTime: {
      type: String,
      default: () => {
        return moment().format("YYYY/MM/DD h:mm:ss");
      },
    },
    upDateTime: {
      type: String,
      default: () => {
        return moment().format("YYYY/MM/DD h:mm:ss");
      },
    },
  },
  {
    toJSON: { virtuals: true },
  }
);
Schema.virtual("likeTest", {
  ref: "Like",
  localField: "like",
  foreignField: "articleId",
});

module.exports = mongoose.model("Article", Schema);
