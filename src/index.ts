import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import helmet from "helmet";
import routes from './routes/routes';
import { invalidAcceptMiddleware } from './middleware/invalidContent';
import { errorHandler } from './handler/errorHandler';
import { usernameRequiredMiddleware } from './middleware/usernameRequired';

dotenv.config();

//check port in the env file 
if (!process.env.PORT) {
   process.exit(1);
}

// Create a new instance of Express
const app: Express = express();

//default cors options
const corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  optionsSuccessStatus: 200,
};

// hide X-Powered-By, security practice
app.use(helmet.hidePoweredBy());
// configuring CORS for the application
app.use(cors(corsOptions));
// parsing incoming requests with JSON payloads
app.use(express.json());
// using the Invalid Accept middleware
app.use(invalidAcceptMiddleware);
// using the Username Required middleware
app.use(usernameRequiredMiddleware)
// using the Error Handler
app.use(errorHandler);
// router from project routes
app.use("", routes);

// export express instance with all the configuration
export default app;