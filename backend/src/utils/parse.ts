import { newProduct, CartListing } from "../types";


export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const isBoolean = (text: unknown): text is boolean => {
  return typeof text === 'boolean' || text instanceof Boolean;
};
const isNumber = (text: unknown): text is number => {
  return typeof text === 'number' || text instanceof Number;
};






const isName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name`);
  }
  return name;
};
const isPhoto = (mainPhoto: unknown): string => {
  if (!mainPhoto || !isString(mainPhoto)) {
    throw new Error(`Incorrect or missing main photo`);
  }
  return mainPhoto;
};
const isType = (type: unknown): string => {
  if (!type || !isString(type)) {
    throw new Error(`Incorrect or missing type`);
  }
  return type;
};
const isStock = (stock: unknown): number => {
  if (!isNumber(stock)) {
    throw new Error(`Incorrect or missing stock`);
  }
  return stock;
};

const isAvailable = (available: unknown): boolean => {
  if (!isBoolean(available)) {
    throw new Error(`Incorrect or missing availble`);
  }
  return available;
};


type productFields = {
  name: unknown,
  type: unknown,
  stock: unknown,
  available: unknown,
  cratedAt: unknown,
  updatedAt: unknown
  photo: unknown

}

export const validProduct = (body: productFields): newProduct => {
  return {
    name: isName(body.name),
    type: isType(body.type),
    stock: isStock(body.stock),
    available: isAvailable(body.available),
    photo: isPhoto(body.photo)

  }
}



export const onclyUnique = (cart: CartListing[]): CartListing[] => {
  const unqiueSet: CartListing[] = []
  const isDouble = (listing: any) => unqiueSet.some((obj: any) => obj.product.toString() === listing.product.toString())
  cart.forEach(listing => {
    if (!isDouble(listing)) {
      unqiueSet.push(listing)
    }
  })
  return unqiueSet
}