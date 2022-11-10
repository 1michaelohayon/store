import bcrypt from "bcrypt"
import UserSchema from "../modals/user";
import { CartListing } from "../types";
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
      type: 1,
      name: 1,
      description: 1,
      stock: 1,
      photo: 1,
      price: 1,
      available: 1,
      specifications: 1,
      cratedAt: 1,
      updatedAt: 1
    })
  user
    ? res.json(user)
    : res.status(404).end('user not found')
})

usersRouter.get('/:id/inCart/:productId', async (req, res) => {
  const user = await UserSchema.findById(req.params.id)
    .populate("inCart.product", {
      id: 1,
      type: 1,
      name: 1,
      description: 1,
      stock: 1,
      photo: 1,
      price: 1,
      available: 1,
      specifications: 1,
      cratedAt: 1,
      updatedAt: 1
    })

  const productInCart = user?.inCart.find(c => c.product?.id.toString() === req.params.productId.toString())


  user
    ? res.json(productInCart)
    : res.status(404).end('user not found')
})

usersRouter.delete('/:id/inCart/:productId', async (req, res) => {
  const user = await UserSchema.findById(req.params.id)
    .populate("inCart.product", {
      id: 1,
    })

  if (!user) {
    return res.status(404).end('user not found')
  }

  const productInCart = user?.inCart.find(c => c.product?.id.toString() === req.params.productId.toString())
  if (!productInCart) {
    return res.status(404).end('product not found')
  }

  user.inCart = user.inCart.filter((c: any) => c.product.id !== productInCart.product?.id)
  await user.save()

  return res.status(200).end()

})



usersRouter.put('/:id/inCart', async (req, res) => {
  const { inCart } = req.body

  const targetUser = await UserSchema.findById(
    req.params.id
  ).populate("inCart.product", {
    id: 1
  })
  if (targetUser) {
    const onclyUnique = (cart: CartListing[]): CartListing[] => {
      const unqiueSet: CartListing[] = []
      const isDouble = (listing: any) => unqiueSet.some((obj: any) => obj.product.id === listing.product?.id)
      cart.forEach(listing => {
        if (!isDouble(listing)) {
          unqiueSet.push(listing)
        }
      })
      return unqiueSet
    }

    const alreadyInCart = targetUser.inCart.find((c: CartListing) => c.product ? c.product.id === inCart.product : false)
    alreadyInCart ? alreadyInCart.amount = inCart.amount : targetUser.inCart = onclyUnique([...targetUser.inCart, inCart])

    await targetUser.save()

    await targetUser.populate("inCart.product", {
      id: 1,
      type: 1,
      name: 1,
      description: 1,
      stock: 1,
      available: 1,
      price: 1,
      photo: 1,
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
    return res.status(400).json({ error: 'Username is already taken.' })
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