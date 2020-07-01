module.exports = (resource) => async (req, res, next) => {
  console.log(`当前访问的表:`, req.params.resource);
  const nodeName = require("inflection").classify(req.params.resource);
  req.Model = null;
  req.Model = require(`../model/${nodeName}`);
  next();
};
