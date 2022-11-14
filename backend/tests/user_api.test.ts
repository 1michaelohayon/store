import supertest from "supertest"
import helper from "./test_helper";
import user from "../src/modals/user";
import app from "../src/app";
import bcrypt from "bcrypt"
const { newUser } = helper

const usersInDb = async () => {
  const users = await user.find({})
  return users.map(u => u.toJSON())
}

const api = supertest(app)



beforeEach(async () => {
  await user.deleteMany({})
  const passwordHash = await bcrypt.hash(newUser.password, 10)
  const createUser = new user({ ...newUser, passwordHash })
  await createUser.save()
}, 100000)

describe(`get and retrival tests`, () => {
  test('HTTP GET request to the /api/users url', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(1)
  }, 100000)


  test('verifies that "_id" is returned as "id"', async () => {
    const response = await api.get('/api/users')
    expect(response.body[0].id).toBeDefined()
  }, 100000)

  test('verifies that "admin" is returned as "false" despite posting "true"', async () => {
    const response = await api.get('/api/users')
    expect(response.body[0].admin).not.toBeDefined()
  }, 100000)

  test('return dates', async () => {
    const response = await api.get('/api/users')

    expect(response.body[0].updatedAt).toBeDefined()
    expect(response.body[0].createdAt).toBeDefined()

  }, 100000)
})

describe('post tests', () => {
  const headerToken = { Accept: 'application/json' }

  test('HTTP POST request to the /api/users url successfully', async () => {
    const usersBefore = await usersInDb()
    const additonalUser = { ...newUser, username: "AdditonalUser" }

    await api
      .post('/api/users')
      .set(headerToken)
      .send(additonalUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length + 1)
    const usernames = usersAfter.map(b => b.username)
    expect(usernames).toContain(additonalUser.username)
  })
  test('400 error when posting user with the same username', async () => {
    const usersBefore = await usersInDb()
    await api
      .post('/api/users')
      .set(headerToken)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length)
  })

  test('401 error when posting user with short (under 7 chars) password', async () => {
    const shortPassword = { ...newUser, username: "AdditonalUser", password: "123" }

    const usersBefore = await usersInDb()
    const response = await api
      .post('/api/users')
      .set(headerToken)
      .send(shortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await usersInDb()

    expect(response.body.error).toBe("password must be at least 7 characters long")
    expect(usersAfter).toHaveLength(usersBefore.length)
  })


  test('Can Succesfully login', async () => {
    const { username, password } = newUser

    const response = await api
      .post('/api/login')
      .set('Accept', 'application/json')
      .send({ username, password })

    expect(response.body.username).toBe(username)
    expect(response.body.token).toBeDefined()
  })

})








describe('put tests', () => {
  let token: string

  beforeEach(async () => {
    const { username, password } = newUser
    const response = await api
      .post('/api/login')
      .set('Accept', 'application/json')
      .send({ username, password })

    token = response.body.token
  }, 100000)


  test("HTTP Put request to the /api/users/inCart url successfully add items to user's cart", async () => {
    const usersBefore = await usersInDb()


    const HeaderToken = { 'Authorization': `bearer ${token}`, Accept: 'application/json' }

    await api
      .put('/api/users/inCart')
      .set(HeaderToken)
      .send([
        { product: "6369f7e135bee36bc78b44aa", amount: 1 },
        { product: "6369eda335bee36bc78b4499", amount: 1 },
      ])


    const usersAfter = await usersInDb()

    expect(usersBefore[0].inCart).toHaveLength(0)
    expect(usersAfter[0].inCart).toHaveLength(2)

  })

  test("HTTP Put request with duplicate IDs returns unique array without duplicates", async () => {
    const usersBefore = await usersInDb()

    const HeaderToken = { 'Authorization': `bearer ${token}`, Accept: 'application/json' }

    await api
      .put('/api/users/inCart')
      .set(HeaderToken)
      .send([
        { product: "6369f7e135bee36bc78b44aa", amount: 1 },
        { product: "6369f7e135bee36bc78b44aa", amount: 1 },
        { product: "6369f7e135bee36bc78b44aa", amount: 1 },
        { product: "6369f7e135bee36bc78b44aa", amount: 1 },
      ])


    const usersAfter = await usersInDb()

    expect(usersBefore[0].inCart).toHaveLength(0)
    expect(usersAfter[0].inCart).toHaveLength(1)


  })

})

