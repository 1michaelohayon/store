
export interface Product {
  id: string,
  type: string,
  name: string,
  description?: string,
  stock: number,
  available: boolean,
  specifications?: {
    dimensions: string,
    weight: number
  },
  cratedAt: Date,
  updatedAt: Date
}

export interface User {
  username: string,
  name?: String,
  email?: String,
  address?: String,
  passwordHash: String,
}

export type newProduct = Omit<Product, "id" | "cratedAt" | "updatedAt">