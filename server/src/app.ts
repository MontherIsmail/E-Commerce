import express, { Request, Response } from 'express';
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { clientError, serverError } from "./controllers/errorsControllers";
import router from "./routes";
import cors from "cors";
import { join } from "path";

dotenv.config();
const {
  env: { PORT, NODE_ENV },
} = process;
const app = express();

// Build allowed origins list from CORS_ORIGIN env (comma-separated)
const corsEnv = process.env.CORS_ORIGIN || '';
const allowedOrigins = corsEnv
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server or same-origin requests with no Origin header
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
  })
);


app.set("port", PORT || 5000);
app.use([
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(),
]);

app.use("/api/v1", router);

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the client/build directory with /ecommerce prefix
  app.use('/ecommerce', express.static(join(__dirname, '..', '..', 'client', 'build')));

  // Handle client-side routing for /ecommerce paths (but not API routes)
  app.get('/ecommerce*', (req: Request, res: Response) => {
    // Skip if it's trying to access API routes
    if (req.path.includes('/api/')) {
      return res.status(404).json({ message: 'API route not found' });
    }
    // Serve the correct HTML file from server/pages directory
    const indexPath = join(__dirname, '..', '..', 'client', 'build', 'server', 'pages', 'index.html');
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('Error serving index.html:', err);
        res.status(404).send('Page not found');
      }
    });
  });

  // For root path, redirect to /ecommerce
  app.get('/', (req: Request, res: Response) => {
    res.redirect('/ecommerce');
  });
}

app.use(clientError);
app.use(serverError);

export default app;
