import supertest from "supertest"
import helper from "./test_helper";
import user from "../src/modals/user";
import app from "../src/app";

const { newUser } = helper

const usersInDb = async () => {
  const users = await user.find({})
  return users.map(u => u.toJSON())
}

const api = supertest(app)



beforeEach(async () => {
  await user.deleteMany({})
  const createUser = new user(newUser)
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
  test('401 error when posting user with the same username', async () => {
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
    await api
      .post('/api/users')
      .set(headerToken)
      .send(shortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length)
  })
})