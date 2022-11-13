import { Types } from "mongoose"
import { JwtPayload } from "jsonwebtoken"
import express from "express"

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
  name?: string,
  email?: string,
  admin: boolean,
  address?: String,
  passwordHash: string,
  inCart: CartListing[]
  cratedAt: Date,
  updatedAt: Date
}



export interface JwtId extends JwtPayload {
  id: string
}
export interface userReq extends express.Request {
  user?: JwtId | null
}

export type newProduct = Omit<Product, "id" | "cratedAt" | "updatedAt">