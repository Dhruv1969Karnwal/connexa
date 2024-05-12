import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());

import companyRouter from './routes/company.route.js';
import allDetailRouter from './routes/company.route.js';
import companySearchRoute from './routes/company.route.js';

app.use('/api/v1/company', companyRouter);
app.use('/api/v1/all', allDetailRouter);
// app.use('/api/v1/search', companySearchRoute);

export { app };
