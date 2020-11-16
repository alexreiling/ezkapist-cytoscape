const shortId = require('shortid');
module.exports = (req, res, next) => {
  if (['PUT', 'POST', 'DELETE'].includes(req.method))
    req.body.folderId = req.body.parentId;
  if (req.method === 'POST') {
    req.body.id = shortId.generate();
  }
  next();
};
