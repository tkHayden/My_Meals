const jwt = require('jsonwebtoken');
const {auth} = require('express-oauth2-jwt-bearer');

const AUDIENCE = process.env.AUTH0_AUDIENCE;
const URL = process.env.AUTH0_ISSUEURL;

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

exports.checkJwt = auth({
  audience: AUDIENCE,
  issuerBaseURL: URL,
});


