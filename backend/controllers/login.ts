import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Router } from "express";
const loginRouter = Router()
import config from "../src/utils/config";
import userSchema from "../src/modals/user"

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await userSchema.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : user.passwordHash === undefined
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, config.SECRET as string, { expiresIn: 60 * 60 })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

export default loginRouter