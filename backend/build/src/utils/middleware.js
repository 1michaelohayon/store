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
exports.morganLog = exports.userExtractor = exports.validateProduct = void 0;
const parse_1 = require("./parse");
const user_1 = __importDefault(require("../modals/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
const morgan_1 = __importDefault(require("morgan"));
const validateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, parse_1.validProduct)(req.body);
    }
    catch (error) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(400).end(errorMessage);
    }
    return next();
});
exports.validateProduct = validateProduct;
const userExtractor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        const token = authorization.substring(7);
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.SECRET);
        req.user = yield user_1.default.findById(decodedToken.id);
    }
    else {
        req.user = null;
    }
    console.log(res);
    return next();
});
exports.userExtractor = userExtractor;
const morganLog = () => {
    morgan_1.default.token("body", (req) => JSON.stringify(req.body));
    return (0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms :body");
};
exports.morganLog = morganLog;