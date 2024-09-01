"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const verifyToken = (token, privateKey) => new Promise((resolve, reject) => {
    (0, jsonwebtoken_1.verify)(token, privateKey, (err, decoded) => {
        if (err)
            return reject(err);
        return resolve(decoded);
    });
});
exports.default = verifyToken;
