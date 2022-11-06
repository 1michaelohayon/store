export interface Credentials{
  username: string,
  password: string
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