// express thirdparty modules
import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

require('dotenv').config({ path: '../.env' });
import { connectDB } from './db/connect';
import swaggerUi from 'swagger-ui-express';

// local modules
import localeRouter from './routes/locale';
import authRouter from './routes/auth';
import adminRouter from './routes/admin';
import { errorHandler } from './middleware/error-handler';
import { notFound } from './middleware/not-found';
import User from './models/user'


let openApiDocumentation = require('./docs.json');
import checkApiKey from './middleware/check-api-key';

// initializing express server
const app = express();
const PORT = process.env.PORT;

// rate limiter
const limiter = rateLimit({
  // max of 20 request per minute
  max: 20,
  windowMs: 60 * 1000,
  message: 'Too many requests',
});

// middlewares
app.set('trust proxy', 1);
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

// endpoints
app.use('/api/v1/nigeria', authRouter);
app.use('/api/v1/nigeria', checkApiKey, localeRouter);
app.use('/api/v1/nigeria', checkApiKey, adminRouter);

// test api
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'api is working...',
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
    app.listen(PORT, () => {
      console.log(`Server is listening to port ${PORT}....`);
    });
  });

export default app;
