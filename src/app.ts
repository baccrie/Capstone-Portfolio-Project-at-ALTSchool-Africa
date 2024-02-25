// node modules
import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

require('dotenv').config();
import { connectDB } from './db/connect';
import swaggerUi from 'swagger-ui-express';

// third party modules
import localeRouter from './routes/locale';
import authRouter from './routes/auth';
import adminRouter from './routes/admin';
import { errorHandler } from './middleware/error-handler';
import { notFound } from './middleware/not-found';

import { populateRegion } from './populate/populate-region';
import { populateStateAndLga } from './populate/populate-state';

let openApiDocumentation = require('./docs.json');
import checkApiKey from './middleware/check-api-key';

// initializing express server
const app = express();
const PORT = process.env.PORT;

// rate limiter
const limiter = rateLimit({
  // max of 30 request per minute
  max: 30,
  windowMs: 60 * 1000,
  message: 'Too many requests',
});

// middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
app.use(express.json());
app.use(cors());
app.use(limiter);

// endpoints
app.use('/api/v1/nigeria', authRouter);
app.use('/api/v1/nigeria', localeRouter);
app.use('/api/v1/nigeria', checkApiKey, adminRouter);

// test api
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'api working...',
  });
});

// error and not found
app.use(errorHandler);
app.use(notFound);

// connect to db and start server
connectDB(process.env.MONGODB_URI)
  .then((res) => {
    console.log(`Connection to db successful...`);
  })
  .then(() => {
    if (process.env.NODE_ENV === 'production') {
      console.log('Database successfully loaded and populated..');
    }
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening to port ${PORT}....`);
    });
  });
