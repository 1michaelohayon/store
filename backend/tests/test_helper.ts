import { Product } from "../src/types"

const initialProducts = [
  {
    specifications: {
      "dimensions": "187 X 73.5 X 115 cm",
      "weight": 120
    },
    type: "vehicle",
    name: "Bandit9 Nano Electric Scooter",
    description: "Filler text (also placeholder text or dummy text) is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail spam filter. The process of using filler text is sometimes called greeking, although the text itself may be nonsense, or largely Latin, as in Lorem ipsum. ASDF is the sequence of letters that appear on the first four keys on the home row of a QWERTY or QWERTZ keyboard. They are often used as a sample or test case or as random, meaningless nonsense. It is also a common learning tool for keyboard classes, since all four keys are located on Home row. ",
    stock: 4,
    available: true,
    photo: "https://images2.imgbox.com/f6/5e/Px6zQUcl_o.jpg",
    price: 4499,
    secondaryPhotos: [
      "https://images2.imgbox.com/62/83/gEhK1W6e_o.jpg",
      "https://images2.imgbox.com/90/f1/YXo7sE8R_o.jpg"
    ],
    cratedAt: new Date("2022-11-08T05:41:08.755Z"),
    updatedAt: new Date("2022-11-08T05:41:08.755Z"),
    _id: "6369ebf435bee36bc78b4496"
  },
  {
    specifications: {
      "dimensions": "173 cm",
      "weight": 72
    },
    type: "robot",
    name: "Tesla Bot",
    description: "Filler text (also placeholder text or dummy text) is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail spam filter. The process of using filler text is sometimes called greeking, although the text itself may be nonsense, or largely Latin, as in Lorem ipsum. ASDF is the sequence of letters that appear on the first four keys on the home row of a QWERTY or QWERTZ keyboard. They are often used as a sample or test case or as random, meaningless nonsense. It is also a common learning tool for keyboard classes, since all four keys are located on Home row. ",
    stock: 1,
    available: true,
    photo: "https://images2.imgbox.com/65/8a/ZcuFXEf5_o.jpg",
    price: 20000,
    secondaryPhotos: [
      "https://images2.imgbox.com/ce/56/6W0h05i6_o.jpg",
      "https://images2.imgbox.com/b0/0d/5fc6I8Qb_o.jpg"
    ],
    cratedAt: new Date("2022-11-08T05:48:19.628Z"),
    updatedAt: new Date("2022-11-08T05:48:19.628Z"),
    _id: "6369eda335bee36bc78b4499"
  },
  {
    specifications: {
      dimensions: "18 X 29 X 30 cm",
      weight: 2.2
    },
    type: "robot",
    name: "Sony aibo",
    description: "Filler text (also placeholder text or dummy text) is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail spam filter. The process of using filler text is sometimes called greeking, although the text itself may be nonsense, or largely Latin, as in Lorem ipsum. ASDF is the sequence of letters that appear on the first four keys on the home row of a QWERTY or QWERTZ keyboard. They are often used as a sample or test case or as random, meaningless nonsense. It is also a common learning tool for keyboard classes, since all four keys are located on Home row. ",
    stock: 32,
    available: true,
    photo: "https://images2.imgbox.com/69/96/unyEAuth_o.jpg",
    price: 2899,
    secondaryPhotos: [
      "https://images2.imgbox.com/d3/09/VMY0rTP4_o.png",
      "https://images2.imgbox.com/ff/34/wBjJ76Q5_o.png"
    ],
    cratedAt: new Date("2022-11-08T06:32:01.341Z"),
    updatedAt: new Date("2022-11-08T06:32:01.341Z"),
    _id: "6369f7e135bee36bc78b44aa"
  }]

const topStock = initialProducts[2]



const highestStock = (products: Product[]): Product => {
  let highestStock = products[0]
  products.forEach(p => {
    if (p.stock > highestStock.stock) {
      highestStock = p
    }
  })
  return highestStock
}


const newProduct = {
  "type": "music-player",
  "name": "Devialet Mania Portable Speaker",
  "description": "Filler text (also placeholder text or dummy text) is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail spam filter. The process of using filler text is sometimes called greeking, although the text itself may be nonsense, or largely Latin, as in Lorem ipsum. ASDF is the sequence of letters that appear on the first four keys on the home row of a QWERTY or QWERTZ keyboard. They are often used as a sample or test case or as random, meaningless nonsense. It is also a common learning tool for keyboard classes, since all four keys are located on Home row. ",
  "stock": 15,
  "available": true,
  "price": 790,
  "photo": "https://images2.imgbox.com/5a/57/O7eYd00w_o.jpg",
  "secondaryPhotos": [
    "https://images2.imgbox.com/5a/09/aWXE0YX5_o.jpg",
    "https://images2.imgbox.com/92/c5/fhHHPxxl_o.jpg"
  ],
  "specifications": {
    "dimensions": "17.6 X 13.9 X 19.3 cm",
    "weight": 2.3
  }
}


const newUser = {
  username: "NotAdmin",
  password: "sismakasha",
  cratedAt: new Date(),
  updatedAt: new Date()
}


const helper = { initialProducts, topStock, highestStock, newProduct, newUser }
export default helper