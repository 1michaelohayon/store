import { Types } from "mongoose"

export interface Product {
  id: string,
  type: string,
  name: string,
  description?: string,
  stock: number,
  available: boolean,
  price?: Number,
  photo?: string,
  secondaryPhotos?: string[],
  specifications?: {
    dimensions: string,
    weight: number
  },
  cratedAt: Date,
  updatedAt: Date
}

export interface CartListing {
  product?: Types.ObjectId,
  amount?: number
}

export interface User {
  username: string,
  name?: String,
  email?: String,
  address?: String,
  passwordHash: String,
  inCart?: CartListing[]
}

export type newProduct = Omit<Product, "id" | "cratedAt" | "updatedAt">