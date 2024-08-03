import express from 'express';
import router from "./routes";
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/v1', router);

export default app;