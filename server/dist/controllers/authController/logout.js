"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logout = (req, res) => {
    const isProduction = process.env.NODE_ENV === 'production';
    res.clearCookie('token', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: '/',
    });
    return res.status(200).json({ message: 'logout successfully' });
};
exports.default = logout;
