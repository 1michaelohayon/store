"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, minLength: 3, required: true },
    name: String,
    email: String,
    address: String,
    admin: Boolean,
    passwordHash: String,
    inCart: [{
            product: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product" },
            amount: Number
        }],
    cratedAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});
userSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
        delete returnedObject.admin;
    },
});
exports.default = mongoose_1.default.model("User", userSchema);
