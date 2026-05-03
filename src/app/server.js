import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import indexRoutes from '../routes/index.routes.js';

const app = express();

app.use(morgan("dev"));
app.use(json());
app.use(cors({ origin: "*" }));
app.use(helmet());

// Rutas principales
app.use('/api', indexRoutes);

export default app;