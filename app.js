// node modules
const express = require('express');
require('dotenv').config();

// third party modules
const localeRouter = require('./routes/locale');
const authRouter = require('./routes/auth');
const {
  errorHandler,
} = require('./middleware/error-handler');
const {
  notFound,
} = require('./middleware/not-found');

// initializing express server
const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use('/api/v1/nigeria', localeRouter);
app.use('/api/v1/nigeria', authRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'api working...',
  });
});

app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => {
  console.log(
    'Server is listening to port 8000....'
  );
});
