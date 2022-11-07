import { validProduct } from "./parse";
import userSchema from "../modals/user";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import express from "express";
import config from "./config";
import morgan from "morgan"

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
  return next()
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
  return next();
};



export const morganLog = () => {
  morgan.token("body", (req:express.Request) => JSON.stringify(req.body));
  return morgan(
    ":method :url :status :res[content-length] - :response-time ms :body"
  );
};
