import { validProduct } from "./parse";
import userSchema from "../modals/user";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import express from "express";
import config from "./config";


export const validateProduct = async (req: express.Request, res: express.Response, next: Function) => {
  try {
    validProduct(req.body)
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return res.status(400).end(errorMessage)
  }
  next()
}

interface JwtId extends JwtPayload {
  id: string
}
interface userReq extends express.Request {
  user: JwtId | null
}




export const userExtractor = async (req: userReq, _res: express.Response, next: Function) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, config.SECRET as Secret) as JwtId;
    req.user = await userSchema.findById(decodedToken.id);
  } else {
    req.user = null;
  }
  next();
};