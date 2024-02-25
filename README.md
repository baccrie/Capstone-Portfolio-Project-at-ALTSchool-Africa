# Locale API

Locale is a developer tool for anyone who needs to know Nigeria, geographically at least. Locale’s API shows you all of Nigeria’s regions, states, and local government areas(LGAs). Locale is looking to be a very useful tool for the thousands of businesses building for Nigeria’s 200M+ population size. ",

This is an Locale Application built using Node.js and express framework, which provides geographical information, specifically for regions, states and local governments and several other metadatas.

This API uses a database of location data and a caching mechanism for better performance. You will need an API key for authorization. The API endpoints and functionality can be found below.

---

## Stack

<div align="center">

<a href="">![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)</a>
<a href="">![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)</a>
<a href="">![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)</a>
<a href="">![Swagger UI](https://img.shields.io/badge/Swagger-UI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)</a>
<a href="">![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)</a>

</div>

## Useful Links

- [Swagger API Docs](https://locale-api.onrender.com/api)
- [Hosted Link](https://locale-api.onrender.com/)

## Installation and Usage

1. Clone to local repo.

```bash
  $ git clone https://github.com/baccrie/Capstone-Portfolio-Project-at-ALTSchool-Africa
```

2. export enviromental variables

```bash
   $ export NODE_ENV=development
   $ export PORT=8000
   $ export MONGODB_URI=mongodbURI
```

3. install project dependencies

```bash
  $ npm install
```

4. start app

```bash
   $ npm start
```

### Endpoints

### Notes on Usage

1. The state schema contains a population property which is an Object and returns 3 key value pairs.
   - Total - total population of the state in question according to the 2006 population census data
   - Estimate - estimated population of the state in question based on 2022 projection
   - Density - density of the state with respect to the 2006 population census statistics

- #### example

  ```json
    "population":
      {
        "total": "9,401,288",
        "estimate": "15,462,200",
        "density": "470/km2 (1,200/sq mi)"
      }
  ```

2. Data Caching - Owing to the fact that most of the routes requires a path parameter ,and response data might change on each request depending on this paramter, provided by the enduser. Caching was only adopted for the 3 general endpoints which are shown below.

   ```c
   $ http://localhost:8000/api/v1/nigeria/regions
   $ http://localhost:8000/api/v1/nigeria/states
   $ http://localhost:8000/api/v1/nigeria/lgas
   ```

## General Endpoints

- notes - two out of the three general endpoints accepts two optional query params which is provided depending on if the end user is willing to paginate result or not
  - Limit - limits the no of result
  - Page - display result on a particular page depending on the limit

#### i. get all regions and associated states metadata

```c
$ http://localhost:8000/api/v1/nigeria/regions
```

- response data
  ```json
  {
    "status": "string",
    "nos": 0,
    "data": [
      {
        "name": "string",
        "states": [
          {
            "name": "string",
            "capital": "string",
            "slogan": "string",
            "established": "string",
            "area": "string",
            "postal_code": "string",
            "website": "string",
            "coordinate": "string",
            "region": "string",
            "population": {},
            "description": "string",
            "ethnic_groups": ["string"],
            "lgas": ["string"],
            "institutions": ["string"]
          }
        ],
        "description": "string",
        "major_ethnic_group": ["string"]
      }
    ]
  }
  ```

#### ii. get all states and associated lgas metadata

```c
$ http://localhost:8000/api/v1/nigeria/states
```

- response data
  ```json
  {
    "status": "string",
    "nos": 0,
    "data": [
      {
        "name": "string",
        "capital": "string",
        "slogan": "string",
        "established": "string",
        "area": "string",
        "postal_code": "string",
        "website": "string",
        "coordinate": "string",
        "region": {
          "name": "string",
          "states": ["string"],
          "description": "string",
          "major_ethnic_group": ["string"]
        },
        "population": {},
        "description": "string",
        "ethnic_groups": ["string"],
        "lgas": ["string"],
        "institutions": ["string"]
      }
    ]
  }
  ```

#### iii. get all lgas

```c
$ http://localhost:8000/api/v1/nigeria/lgas
```

- response data
  ```json
  {
    "status": "string",
    "nos": 0,
    "data": [
      {
        "name": "string",
        "state": {},
        "region": {}
      }
    ]
  }
  ```

### Search

- note - accept one required query paramater,

  - keyword - the keyword to search , it can either be a Region, State or Lga

  ```c
  $ http://localhost:8000/api/v1/nigeria/search?keyword=Abuja
  ```

- response data

  ```json
  {
    "status": "string",
    "msg": "string",
    "data": {}
  }
  ```

  ## Specific Endpoints

  - notes - accepts one or two mandatory path params

    - region - name of region
    - state - name of state
    - lga - name of lga

  #### ii. get all lgas in a state

  ```c
  $ http://localhost:8000/api/v1/nigeria/{region}/{state}/lgas
  ```

  - response
    ```json
    {
      "status": "string",
      "nos": 0,
      "data": [
        {
          "name": "string",
          "state": {},
          "region": {}
        }
      ]
    }
    ```

  #### iii. get all states in a region

  ```c
  $ http://localhost:8000/api/v1/nigeria/{region}/lgas
  ```

  - response
    ```json
    {
      "status": "string",
      "nos": 0,
      "data": [
        {
          "name": "string",
          "capital": "string",
          "slogan": "string",
          "established": "string",
          "area": "string",
          "postal_code": "string",
          "website": "string",
          "coordinate": "string",
          "region": {
            "name": "string",
            "states": ["string"],
            "description": "string",
            "major_ethnic_group": ["string"]
          },
          "population": {},
          "description": "string",
          "ethnic_groups": ["string"],
          "lgas": ["string"],
          "institutions": ["string"]
        }
      ]
    }
    ```

## Code Snippets

```js
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
```

## DOcumentation

- #### links -

- #### images
