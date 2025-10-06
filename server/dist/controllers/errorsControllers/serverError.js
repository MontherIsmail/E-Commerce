"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serverError = (err, req, res, next) => {
    if (err.details) {
        return res.status(400).json({ message: err.details[0].message });
    }
    // Log error details to help diagnose 500s in PM2 logs
    try {
        // Avoid logging huge objects; prefer message and stack
        const message = (err === null || err === void 0 ? void 0 : err.message) || 'Unknown server error';
        const stack = err === null || err === void 0 ? void 0 : err.stack;
        console.error('[ServerError]', message);
        if (stack)
            console.error(stack);
    }
    catch (_) {
        // noop
    }
    // Do not leak details to clients in production
    const isProd = process.env.NODE_ENV === 'production';
    const clientMessage = isProd ? 'internal server error ' : ((err === null || err === void 0 ? void 0 : err.message) || 'internal server error ');
    return res.status(500).json({ message: clientMessage });
};
exports.default = serverError;
