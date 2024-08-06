"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ message: 'logout successfully' });
};
exports.default = logout;
