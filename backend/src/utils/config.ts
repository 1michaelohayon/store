require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET;
const config = {
  MONGODB_URI, PORT, SECRET
}


export default config