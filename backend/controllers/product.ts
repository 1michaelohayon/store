import { Router } from "express";
import ProductSchema from "../src/modals/product";
import { Product, newProduct } from "../src/types";
import { validateProduct } from "../src/utils/middleware"
const productRouter = Router()

productRouter.get("/", async (_req, res) => {
  const products: Product[] = await ProductSchema.find({})

  res.json(products)
})


productRouter.post("/", validateProduct, async (req, res) => {
  const body: newProduct = req.body

  const newProduct = new ProductSchema({
    name: body.name,
    type: body.type,
    description: body.description,
    stock: body.stock,
    available: body.available,
    specifications: body.specifications,
    updatedAt: new Date(),
    cratedAt: new Date(),
  })

  const savedProduct = await newProduct.save();
  res.status(201).json(savedProduct)
})

export default productRouter