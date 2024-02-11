const express = require('express');
require('dotenv').config();

const localeRouter = require('./routes/locale');
const {
  errorHandler,
} = require('./middleware/error-handler');
const {
  notFound,
} = require('./middleware/not-found');

const app = express();
const PORT = process.env.PORT;

app.use('/api/v1/nigeria', localeRouter);

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
