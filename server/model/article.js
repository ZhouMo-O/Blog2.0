const mongoose = require("mongoose");
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
        return new Date().toLocaleString();
      },
    },
    upDateTime: {
      type: String,
      default: () => {
        return new Date().toLocaleString();
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
