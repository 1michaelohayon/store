export interface Credentials {
  username: string,
  password: string
}



export enum NotificationStyle {
  info = 'INFO',
  error = 'ERROR',
  success = "SUCCESS",
  placeholder = "PLCEHOLDER"
}

export interface Notification {
  style: NotificationStyle,
  message: string
}

export interface CartItem {
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
  product: Product;
  amount: number;
}

export interface User {
  id: string
  inCart: CartListing[]
  token: string,
  username: string
}
