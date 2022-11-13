import { validProduct } from "./parse";
import userSchema from "../modals/user";
import jwt, { Secret } from "jsonwebtoken";
import express from "express";
import config from "./config";
import morgan from "morgan"
import { userReq, JwtId } from "../types";

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




export const userExtractor = async (req: userReq, res: express.Response, next: Function) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, config.SECRET as Secret) as JwtId;
    req.user = await userSchema.findById(decodedToken.id);
  } catch (error) {
    next(error)
  }
  } else {
    req.user = null;
  }
  res ? console.log('res') : console.log("no res");;
  return next();
};


export const errorHandler = (error: Error, req: express.Request, res: express.Response, next: Function) => {

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "token expired",
    });
  } else if (error.name === "TypeError") {
    return res.status(400).send({ error: "typeerror/malformatted id" });
  } else {
    console.log(req);
  }
  return next(error);
};


export const morganLog = () => {
  morgan.token("body", (req: express.Request) => JSON.stringify(req.body));
  return morgan(
    ":method :url :status :res[content-length] - :response-time ms :body"
  );
};


export const unknownEndpoint = (_req: express.Request, res: express.Response) => {
  res.status(404).send({ error: "unknown endpoint" });
};