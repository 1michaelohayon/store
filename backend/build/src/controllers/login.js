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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = require("express");
const loginRouter = (0, express_1.Router)();
const config_1 = __importDefault(require("../utils/config"));
const user_1 = __importDefault(require("../modals/user"));
loginRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = request.body;
    const user = yield user_1.default.findOne({ username })
        .populate("inCart.product", {
        type: 1,
        name: 1,
        description: 1,
        stock: 1,
        available: 1,
        specifications: 1,
        cratedAt: 1,
        updatedAt: 1
    });
    const passwordCorrect = user === null
        ? false
        : user.passwordHash === undefined
            ? false
            : yield bcrypt_1.default.compare(password, user.passwordHash);
    if (!(user && passwordCorrect)) {
        return response.status(401).json({ error: 'invalid username or password' });
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    };
    const token = jsonwebtoken_1.default.sign(userForToken, config_1.default.SECRET, { expiresIn: 60 * 60 });
    return response
        .status(200)
        .send({ token, id: user.id, inCart: user.inCart, username: user.username, name: user.name });
}));
exports.default = loginRouter;
