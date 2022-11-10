"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const test_helper_1 = __importDefault(require("./test_helper"));
const user_1 = __importDefault(require("../src/modals/user"));
const app_1 = __importDefault(require("../src/app"));
const { newUser } = test_helper_1.default;
const usersInDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find({});
    return users.map(u => u.toJSON());
});
const api = (0, supertest_1.default)(app_1.default);
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteMany({});
    const createUser = new user_1.default(newUser);
    yield createUser.save();
}), 100000);
describe(`get and retrival tests`, () => {
    test('HTTP GET request to the /api/users url', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.body).toHaveLength(1);
    }), 100000);
    test('verifies that "_id" is returned as "id"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get('/api/users');
        expect(response.body[0].id).toBeDefined();
    }), 100000);
    test('verifies that "admin" is returned as "false" despite posting "true"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get('/api/users');
        expect(response.body[0].admin).not.toBeDefined();
    }), 100000);
    test('return dates', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get('/api/users');
        expect(response.body[0].updatedAt).toBeDefined();
        expect(response.body[0].cratedAt).toBeDefined();
    }), 100000);
});
describe('post tests', () => {
    const headerToken = { Accept: 'application/json' };
    test('HTTP POST request to the /api/users url successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const usersBefore = yield usersInDb();
        const additonalUser = Object.assign(Object.assign({}, newUser), { username: "AdditonalUser" });
        yield api
            .post('/api/users')
            .set(headerToken)
            .send(additonalUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const usersAfter = yield usersInDb();
        expect(usersAfter).toHaveLength(usersBefore.length + 1);
        const usernames = usersAfter.map(b => b.username);
        expect(usernames).toContain(additonalUser.username);
    }));
    test('401 error when posting user with the same username', () => __awaiter(void 0, void 0, void 0, function* () {
        const usersBefore = yield usersInDb();
        yield api
            .post('/api/users')
            .set(headerToken)
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const usersAfter = yield usersInDb();
        expect(usersAfter).toHaveLength(usersBefore.length);
    }));
    test('401 error when posting user with short (under 7 chars) password', () => __awaiter(void 0, void 0, void 0, function* () {
        const shortPassword = Object.assign(Object.assign({}, newUser), { username: "AdditonalUser", password: "123" });
        const usersBefore = yield usersInDb();
        yield api
            .post('/api/users')
            .set(headerToken)
            .send(shortPassword)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const usersAfter = yield usersInDb();
        expect(usersAfter).toHaveLength(usersBefore.length);
    }));
});
