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
const express_1 = require("express");
const product_1 = __importDefault(require("../modals/product"));
const middleware_1 = require("../utils/middleware");
const productRouter = (0, express_1.Router)();
productRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.default.find({});
    res.json(products);
}));
productRouter.post("/", middleware_1.userExtractor, middleware_1.validateProduct, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (!req.user) {
        return res.status(401).json({ error: 'token is missing or invalid' });
    }
    if (!req.user.admin) {
        return res.status(401).json({ error: 'not allowed' });
    }
    const newProduct = new product_1.default({
        name: body.name,
        type: body.type,
        description: body.description,
        stock: body.stock,
        available: body.available,
        specifications: body.specifications,
        photo: body.photo,
        price: body.price,
        secondaryPhotos: body.secondaryPhotos,
        updatedAt: new Date(),
        cratedAt: new Date(),
    });
    const savedProduct = yield newProduct.save();
    return res.status(201).json(savedProduct);
}));
exports.default = productRouter;
