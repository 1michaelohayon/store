export interface Credentials {
  username: string,
  password: string
}

export interface cartItem {
  product: string,
  amount: number
}
export interface CartUpdate {
  userId: string,
  inCart: CartListing
}

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


export interface CartListing {
  product: Product;
  amount: number;
}

export interface User {
  id: string
  inCart: CartListing[]
  token: string,
  username: string
}
