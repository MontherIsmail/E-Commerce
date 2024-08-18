import express from "express";
import router from "./routes";
import { clientError, serverError } from "./controllers/errorsControllers";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with frontend URL
  })
);

app.use(express.json());

app.use("/api/v1", router);

app.use(clientError);
app.use(serverError);

export default app;
