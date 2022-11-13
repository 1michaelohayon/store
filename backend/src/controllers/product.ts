import { Router } from "express";
import ProductSchema from "../modals/product";
import { Product, newProduct } from "../types";
import { validateProduct, userExtractor } from "../utils/middleware"
import { userReq } from "../types";

const productRouter = Router()
productRouter.get("/", async (_req, res) => {
  const products: Product[] = await ProductSchema.find({})

  res.json(products)
})


productRouter.post("/", userExtractor, validateProduct, async (req: userReq, res) => {
  const body: newProduct = req.body

  if (!req.user) {
    return res.status(401).json({ error: 'token is missing or invalid' })
  }
  if (!req.user.admin) {
    return res.status(401).json({ error: 'not allowed' })
  }

  const newProduct = new ProductSchema({
    name: body.name,
    type: body.type,
    description: body.description,
    stock: body.stock,
    available: body.available,
    specifications: body.specifications,
    photo: body.photo,
    price: body.price,
    secondaryPhotos: body.secondaryPhotos,
    updatedAt: new Date(),
    cratedAt: new Date(),
  })

  const savedProduct = await newProduct.save();
  return res.status(201).json(savedProduct)
})

export default productRouter