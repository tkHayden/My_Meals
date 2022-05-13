const jwt = require('jsonwebtoken');

exports.verifyUserId = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const auth = authHeader.split(' ')[1];
  const token = jwt.decode(auth);
  console.log(token.sub);
  console.log(req.params.userId);
  if (token.sub && token.sub == req.params.userId) {
    next();
  } else {
    res.sendStatus(401);
  }
};

