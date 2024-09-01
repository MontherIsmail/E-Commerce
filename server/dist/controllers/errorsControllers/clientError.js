"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clientError = (req, res, next) => {
    res.status(404).json({ message: 'Page Not Found' });
};
exports.default = clientError;
