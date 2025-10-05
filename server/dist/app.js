"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorsControllers_1 = require("./controllers/errorsControllers");
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const path_1 = require("path");
dotenv.config();
const { env: { PORT, NODE_ENV }, } = process;
const app = (0, express_1.default)();
const allowedOrigins = [
    'https://e-commerce-ten-puce.vercel.app', // Your Vercel app URL
    'http://localhost:3000', // Dashboard URL
    'http://localhost:3001', // Client URL
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Allow cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.set("port", PORT || 5000);
app.use([
    express_1.default.json(),
    express_1.default.urlencoded({ extended: true }),
    (0, cookie_parser_1.default)(),
]);
app.use("/api/v1", routes_1.default);
if (process.env.NODE_ENV === 'production') {
    // Serve static files from the client/build directory
    app.use(express_1.default.static((0, path_1.join)(__dirname, '..', '..', 'client', 'build')));
    // For any other routes (except API routes), send back the index.html file
    app.get('*', (req, res) => {
        // Skip API routes
        if (req.path.startsWith('/api/')) {
            return res.status(404).json({ message: 'API route not found' });
        }
        try {
            res.sendFile((0, path_1.join)(__dirname, '..', '..', 'client', 'build', 'index.html'));
        }
        catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}
app.use(errorsControllers_1.clientError);
app.use(errorsControllers_1.serverError);
exports.default = app;
