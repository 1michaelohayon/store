"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    stock: { type: Number, required: true },
    available: { type: Boolean, required: true },
    photo: { type: String, required: false },
    price: { type: Number, required: false },
    secondaryPhotos: { type: Array, required: false },
    specifications: {
        dimensions: { type: String, required: false },
        weight: { type: Number, required: false }
    },
    cratedAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});
productSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.default = mongoose_1.default.model("Product", productSchema);
