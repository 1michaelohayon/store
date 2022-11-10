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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../modals/user"));
const express_1 = require("express");
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find({});
    res.json(users);
}));
usersRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(req.params.id)
        .populate("inCart.product", {
        id: 1,
        type: 1,
        name: 1,
        description: 1,
        stock: 1,
        photo: 1,
        price: 1,
        available: 1,
        specifications: 1,
        cratedAt: 1,
        updatedAt: 1
    });
    user
        ? res.json(user)
        : res.status(404).end('user not found');
}));
usersRouter.get('/:id/inCart/:productId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(req.params.id)
        .populate("inCart.product", {
        id: 1,
        type: 1,
        name: 1,
        description: 1,
        stock: 1,
        photo: 1,
        price: 1,
        available: 1,
        specifications: 1,
        cratedAt: 1,
        updatedAt: 1
    });
    const productInCart = user === null || user === void 0 ? void 0 : user.inCart.find(c => { var _a; return ((_a = c.product) === null || _a === void 0 ? void 0 : _a.id.toString()) === req.params.productId.toString(); });
    user
        ? res.json(productInCart)
        : res.status(404).end('user not found');
}));
usersRouter.delete('/:id/inCart/:productId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(req.params.id)
        .populate("inCart.product", {
        id: 1,
    });
    if (!user) {
        return res.status(404).end('user not found');
    }
    const productInCart = user === null || user === void 0 ? void 0 : user.inCart.find(c => { var _a; return ((_a = c.product) === null || _a === void 0 ? void 0 : _a.id.toString()) === req.params.productId.toString(); });
    if (!productInCart) {
        return res.status(404).end('product not found');
    }
    user.inCart = user.inCart.filter((c) => { var _a; return c.product.id !== ((_a = productInCart.product) === null || _a === void 0 ? void 0 : _a.id); });
    yield user.save();
    return res.status(200).end();
}));
usersRouter.put('/:id/inCart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { inCart } = req.body;
    const targetUser = yield user_1.default.findById(req.params.id).populate("inCart.product", {
        id: 1
    });
    if (targetUser) {
        const onclyUnique = (cart) => {
            const unqiueSet = [];
            const isDouble = (listing) => unqiueSet.some((obj) => { var _a; return obj.product.id === ((_a = listing.product) === null || _a === void 0 ? void 0 : _a.id); });
            cart.forEach(listing => {
                if (!isDouble(listing)) {
                    unqiueSet.push(listing);
                }
            });
            return unqiueSet;
        };
        const alreadyInCart = targetUser.inCart.find((c) => c.product ? c.product.id === inCart.product : false);
        alreadyInCart ? alreadyInCart.amount = inCart.amount : targetUser.inCart = onclyUnique([...targetUser.inCart, inCart]);
        yield targetUser.save();
        yield targetUser.populate("inCart.product", {
            id: 1,
            type: 1,
            name: 1,
            description: 1,
            stock: 1,
            available: 1,
            price: 1,
            photo: 1,
            specifications: 1,
            cratedAt: 1,
            updatedAt: 1
        });
        return res.json(targetUser);
    }
    else {
        return res.status(404).end('user not found');
    }
}));
usersRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, name, password } = req.body;
    const existingUser = yield user_1.default.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ error: 'Username is already taken.' });
    }
    else if (!req.body.password) {
        return res.status(400).json({ error: 'missing password' });
    }
    else if (req.body.password.length < 7) {
        return res.status(400).json({ error: 'password must be at least 7 characters long' });
    }
    const saltRounds = 10;
    const passwordHash = yield bcrypt_1.default.hash(password, saltRounds);
    const user = new user_1.default({
        username,
        name,
        admin: false,
        passwordHash,
        updatedAt: new Date(),
        cratedAt: new Date()
    });
    const savedUser = yield user.save();
    return res.status(201).json(savedUser.toJSON());
}));
exports.default = usersRouter;
