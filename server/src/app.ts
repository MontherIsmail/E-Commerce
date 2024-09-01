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

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.set("port", PORT || 5000);
app.use([
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(),
]);

app.use("/api/v1", router);

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the client/build directory
  app.use(express.static(join(__dirname, '..', '..', 'client', 'build')));

  // For any other routes, send back the index.html file
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '..', '..', 'client', 'build', 'index.html'));
  });
}

app.use(clientError);
app.use(serverError);

export default app;
