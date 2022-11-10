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
const product_1 = __importDefault(require("../src/modals/product"));
const app_1 = __importDefault(require("../src/app"));
const { initialProducts } = test_helper_1.default;
const productsInDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.default.find({});
    return products.map(b => b.toJSON());
});
const api = (0, supertest_1.default)(app_1.default);
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield product_1.default.deleteMany({});
    const products = initialProducts.map(p => new product_1.default(p));
    const promisedArray = products.map(p => p.save());
    yield Promise.all(promisedArray);
}), 100000);
describe(`get and retrival tests`, () => {
    test('HTTP GET request to the /api/products url', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api
            .get('/api/products')
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.body).toHaveLength(test_helper_1.default.initialProducts.length);
    }), 100000);
    test('verifies that "_id" is returned as "id"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get('/api/products');
        expect(response.body[0].id).toBeDefined();
    }), 100000);
    test('return dates', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get('/api/products');
        expect(response.body[0].updatedAt).toBeDefined();
        expect(response.body[0].cratedAt).toBeDefined();
    }), 100000);
});
describe('post tests', () => {
    const headerToken = { Accept: 'application/json' };
    const newProduct = test_helper_1.default.newProduct;
    test('401 when trying to post"', () => __awaiter(void 0, void 0, void 0, function* () {
        yield api
            .post('/api/products')
            .set(headerToken)
            .send(newProduct)
            .expect(401);
        const productsAfter = yield productsInDB();
        expect(productsAfter).toHaveLength(initialProducts.length);
        const names = productsAfter.map(b => b.name);
        expect(names).not.toContain(test_helper_1.default.newProduct.name);
    }));
});
