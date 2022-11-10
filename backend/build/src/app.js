"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./utils/config"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const parse_1 = require("../src/utils/parse");
const middleware_1 = require("./utils/middleware");
const product_1 = __importDefault(require("./controllers/product"));
const users_1 = __importDefault(require("./controllers/users"));
const login_1 = __importDefault(require("./controllers/login"));
if (!(0, parse_1.isString)(config_1.default.MONGODB_URI)) {
    throw new Error("Mongodb URI is not a string");
}
console.log("connecting to", config_1.default.MONGODB_URI);
mongoose_1.default
    .connect(config_1.default.MONGODB_URI)
    .then(() => {
    console.log("connected to MongoDB");
})
    .catch((error) => {
    console.log("error connceting to MongoDB:", error.message);
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('front_build'));
app.use((0, middleware_1.morganLog)());
app.use("/api/products", product_1.default);
app.use("/api/users", users_1.default);
app.use("/api/login", login_1.default);
exports.default = app;
