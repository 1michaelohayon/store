"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validProduct = exports.isString = void 0;
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
exports.isString = isString;
const isBoolean = (text) => {
    return typeof text === 'boolean' || text instanceof Boolean;
};
const isNumber = (text) => {
    return typeof text === 'number' || text instanceof Number;
};
const isName = (name) => {
    if (!name || !(0, exports.isString)(name)) {
        throw new Error(`Incorrect or missing name`);
    }
    return name;
};
const isPhoto = (mainPhoto) => {
    if (!mainPhoto || !(0, exports.isString)(mainPhoto)) {
        throw new Error(`Incorrect or missing main photo`);
    }
    return mainPhoto;
};
const isType = (type) => {
    if (!type || !(0, exports.isString)(type)) {
        throw new Error(`Incorrect or missing type`);
    }
    return type;
};
const isStock = (stock) => {
    if (!isNumber(stock)) {
        throw new Error(`Incorrect or missing stock`);
    }
    return stock;
};
const isAvailable = (available) => {
    if (!isBoolean(available)) {
        throw new Error(`Incorrect or missing availble`);
    }
    return available;
};
const validProduct = (body) => {
    return {
        name: isName(body.name),
        type: isType(body.type),
        stock: isStock(body.stock),
        available: isAvailable(body.available),
        photo: isPhoto(body.photo)
    };
};
exports.validProduct = validProduct;
