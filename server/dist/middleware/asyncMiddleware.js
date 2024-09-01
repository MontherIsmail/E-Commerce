"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncMiddleware = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    }
    catch (error) {
        next(error);
    }
};
exports.default = asyncMiddleware;
