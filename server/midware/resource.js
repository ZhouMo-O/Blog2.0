module.exports = (resource) => async (req, res, next) => {
  console.log(`当前访问的表:`, req.params.resource);
  const nodeName = require("inflection").classify(req.params.resource);
  req.Model = null;
  req.Model = require(`../model/${nodeName}`);
  //article 的 relatedTag 需要 populate 到 Tag，
  //但 mongoose 只认识「已注册」的模型，故此处主动注册 Tag，避免 MissingSchemaError
  if (String(req.Model.modelName).toLowerCase() === "article") {
    require("../model/Tag");
  }
  next();
};
