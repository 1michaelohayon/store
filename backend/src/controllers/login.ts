import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Router } from "express";
const loginRouter = Router()
import config from "../utils/config";
import userSchema from "../modals/user"

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await userSchema.findOne({ username })
    .populate("inCart.product", {
      type: 1,
      name: 1,
      description: 1,
      stock: 1,
      available: 1,
      specifications: 1,
      createdAt: 1,
      updatedAt: 1
    })



  const passwordCorrect = user === null
    ? false
    : user.passwordHash === undefined
      ? false
      : bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, config.SECRET as string, { expiresIn: 60 * 60 })

  return response
    .status(200)
    .send({ token, id: user.id, inCart: user.inCart, username: user.username, name: user.name })
})

export default loginRouter