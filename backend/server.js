import express from "express";
import dotenv from "dotenv";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import  YAML from 'yamljs';
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import path from 'path';
import flightRoutes from './routes/flightRoutes.js';


dotenv.config();



const port = process.env.PORT || 5000;

connectDB();

const app = express();

const swaggerDocument = YAML.load('./backend/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'frontend/dist')));

  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')))
} else {
  app.get("/", (req, res) => res.send('Server is ready'));
}

app.use('/api/flights', flightRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
