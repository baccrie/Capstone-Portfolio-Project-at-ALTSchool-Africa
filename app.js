// node modules
const express = require('express');
const { rateLimit } = require('express-rate-limit');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./docs.json');

// third party modules
const localeRouter = require('./routes/locale');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const { errorHandler } = require('./middleware/error-handler');
const { notFound } = require('./middleware/not-found');

// initializing express server
const app = express();
const PORT = process.env.PORT;

const limiter = rateLimit({
  max: 20,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests',
});

// middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
app.use(express.json());
app.use(cors());
app.use(limiter);

// api middlewares router
app.use('/api/v1/nigeria', localeRouter);
app.use('/api/v1/nigeria', authRouter);
app.use('/api/v1/nigeria', adminRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'api working...',
  });
});

app.use(errorHandler);
app.use(notFound);

connectDB(process.env.MONGODB_URI).then((res) => {
  console.log(`Connection to db successful...`);
  app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}....`);
  });
});
