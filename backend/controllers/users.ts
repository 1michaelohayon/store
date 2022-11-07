import bcrypt from "bcrypt"
import UserSchema from "../src/modals/user";
import { Router } from "express";

const usersRouter = Router()


usersRouter.get('/', async (_req, res) => {
  const users = await UserSchema.find({})
  res.json(users)
})

usersRouter.get('/:id', async (req, res) => {
  const user = await UserSchema.findById(req.params.id)
    .populate("inCart.product", {
      id: 1,
    })
  user
    ? res.json(user)
    : res.status(404).end('user not found')
})


usersRouter.put('/:id', async (req, res) => {
  const { inCart } = req.body

  const targetUser = await UserSchema.findById(
    req.params.id
  ).populate("inCart.product", {
    id: 1
  })

  if (targetUser) {
    const alreadyInCart = targetUser.inCart.find((c: any) => c.product.id === inCart.product)

    alreadyInCart ? alreadyInCart.amount = inCart.amount : targetUser.inCart.push(inCart)


    await targetUser.save()

    await targetUser.populate("inCart.product", {
      id: 1,
      type: 1,
      name: 1,
      description: 1,
      stock: 1,
      available: 1,
      specifications: 1,
      cratedAt: 1,
      updatedAt: 1
    })



    return res.json(targetUser)
  } else {
    return res.status(404).end('user not found')

  }

})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const existingUser = await UserSchema.findOne({ username })

  if (existingUser) {
    return res.status(400).json({ error: 'username must be unique' })
  } else if (!req.body.password) {
    return res.status(400).json({ error: 'missing password' })
  } else if (req.body.password.length < 7) {
    return res.status(400).json({ error: 'password must be at least 7 characters long' })
  }


  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new UserSchema({
    username,
    name,
    admin: false,
    passwordHash,
    updatedAt: new Date(),
    cratedAt: new Date()
  })

  const savedUser = await user.save()


  return res.status(201).json(savedUser.toJSON())
})

export default usersRouter