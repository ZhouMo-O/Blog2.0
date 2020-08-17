module.exports = (app) => (req, res, next) => {
  const messageDb = require("../db/message");
  if (req.params.resource == message) next; //如果本次操作是针对message的 那么就跳过

  if (req.params.resource == comment) {
    
  }
};
