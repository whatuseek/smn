// smn/user-ticket/backend/middleware/setupMiddleware.js

import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();



app.use(cors);
const setupMiddleware = (app) => {
  app.use(express.json());
  app.use(morgan('dev'));
};

export default setupMiddleware;
