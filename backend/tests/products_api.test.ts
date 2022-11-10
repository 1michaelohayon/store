import mongoose from "mongoose";
import supertest from "supertest"
import helper from "./test_helper";
import product from "../src/modals/product";
import app from "../src/app";
const {initialProducts} = helper

const productsInDB = async () => {
  const products = await product.find({})
  return products.map(b => b.toJSON())
}



const api = supertest(app)

beforeEach(async () => {
  await product.deleteMany({})
  const products = initialProducts.map(p => new product(p))
  const promisedArray = products.map(p => p.save())
  await Promise.all(promisedArray)
}, 100000)

describe(`get and retrival tests`, () => {
  test('HTTP GET request to the /api/products url', async () => {
    const response = await api
      .get('/api/products')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialProducts.length)
  }, 100000)
  test('verifies that "_id" is returned as "id"', async () => {
    const response = await api.get('/api/products')
    expect(response.body[0].id).toBeDefined()
  }, 100000)
})

describe('post/delete tests', () => {
  const headerToken = {Accept: 'application/json' }

  test('HTTP POST request to the /api/products url successfully', async () => {
    const newProduct = helper.newProduct;
    

    await api
      .post('/api/products')
      .set(headerToken)
      .send(newProduct)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const productsAfter = await productsInDB()
    expect(productsAfter).toHaveLength(initialProducts.length + 1)

    const names = productsAfter.map(b => b.name)
    expect(names).toContain(helper.newProduct.name)
  })


})
