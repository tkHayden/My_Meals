import jwt from 'jsonwebtoken';
import {auth} from 'express-oauth2-jwt-bearer';
import { Request, Response, NextFunction } from 'express';



const AUDIENCE = process.env.AUTH0_AUDIENCE;
const URL = process.env.AUTH0_ISSUEURL;

export const verifyUserId = (req: Request, res: Response, next : NextFunction): void => {
  const authHeader = req.headers['authorization'];
  if (!authHeader){
    res.sendStatus(401);
    return
  }
  const auth = authHeader.split(' ')[1];
  const token = jwt.decode(auth);
  if (token && token.sub && token.sub == req.params.userId) {
    next();
  } else {
    res.sendStatus(401);
  }
};

export const checkJwt = auth({
  audience: AUDIENCE,
  issuerBaseURL: URL,
});


