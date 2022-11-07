
import config from './utils/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { isString } from "../src/utils/parse"
import { morganLog } from './utils/middleware';

import productRouter from '../controllers/product';
import userRouter from '../controllers/users';
import loginRouter from '../controllers/login'


if (!isString(config.MONGODB_URI)){
  throw new Error("Mongodb URI is not a string")
}


console.log("connecting to", config.MONGODB_URI)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connceting to MongoDB:", error.message);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use(morganLog())

app.use("/api/products", productRouter);
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter);


export default app