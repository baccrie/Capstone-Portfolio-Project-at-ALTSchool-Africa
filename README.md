# Locale API

Locale is a developer tool for anyone who needs to know Nigeria, geographically at least. Locale’s API shows you all of Nigeria’s regions, states, and local government areas(LGAs). Locale is looking to be a very useful tool for the thousands of businesses building for Nigeria’s 200M+ population size.

The Application is built using Node.js and express framework using MongoDB, which provides geographical information, specifically for regions, states and local governments and several other metadatas.

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

- [Swagger API Docs](https://capstone-portfolio-project-at-altschool.onrender.com/api-docs)
- [Hosted Link](https://capstone-portfolio-project-at-altschool.onrender.com/)

## Installation and Usage

1. Clone to local.

```bash
  $ git clone https://github.com/baccrie/Capstone-Portfolio-Project-at-ALTSchool-Africa
```

2. export enviromental variables

```bash
   $ export NODE_ENV=development
   $ export PORT=8000
   $ export MONGODB_URI=<YOUR MONGODB URI>
   $ export REDIS_URL=<url>
```

3. install project dependencies

```bash
  $ npm install
```

4. populate database with locale data

```bash
  $ npm run populateDB
```

5. build up with ts compiler and start app

```bash
   $ npm start
```

#### Notes

For running the tests cases with

```bash
  $ npm test
```

steps 1 - 5 above must have been implemented otherwise running the test would throw an error

## Endpoints

### Notes on Usage

#### 1. The swagger documentation of the project can be accessed by preceeding the base url with /api-docs see example below

- ```c
  http://localhost:8000/api-docs
  ```

#### 2. The state schema contains a population property which is an Object and returns 3 key value pairs.

- Total - total population of the state in question according to the 2006 population census data
- Estimate - estimated population of the state in question based on 2022 projection
- Density - density of the state with respect to the 2006 population census statistics

- #### example

- ```json
   "population":
     {
       "total": "9,401,288",
       "estimate": "15,462,200",
       "density": "470/km2 (1,200/sq mi)"
     }
  ```

#### 3. Data Caching

- Owing to the fact that most of the routes requires a path parameter and response data might change on each request depending on this paramter, provided by the enduser. Caching was only adopted for the 3 general endpoints which are shown below.

- ```c
  http://localhost:8000/api/v1/nigeria/regions
  http://localhost:8000/api/v1/nigeria/states
  http://localhost:8000/api/v1/nigeria/lgas
  ```

#### 4. Rate Limiting

- Max of 20 requests per minutes was implented for the api to avoid overloading of the server.

### 1. Auth Endpoint

- all other endpoints are protected and therefore requires an apikey in req header with the name "apikey" for authorization, this auth key can be generated once after signup with the auth signup endpoint below.

  #### i. signup user and generate apikey for subsequent request access to other protected endpoints.

  ```c
  http://localhost:8000/api/v1/nigeria/auth/signup
  ```

- request payload

- ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

- response data

- ```json
  {
    "status": "string",
    "msg": "string",
    "api_key": "string"
  }
  ```

### 2. General Endpoints

- notes - two out of the three general endpoints accepts two optional query params which is provided depending on if the end user is willing to paginate result or not

  - Limit - limits the no of result
  - Page - display result on a particular page depending on the limit

#### i. get all regions and associated states metadata

- ```c
  http://localhost:8000/api/v1/nigeria/regions
  ```

- response data
- ```json
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

- ```c
  http://localhost:8000/api/v1/nigeria/states
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

- ```c
  http://localhost:8000/api/v1/nigeria/lgas
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

### 3. Search Endpoint

- note - accept one required query paramater,

  - keyword - the keyword to search , it can either be a Region, State or Lga

  ```c
  http://localhost:8000/api/v1/nigeria/search?keyword=Abuja
  ```

- response data

  ```json
  {
    "status": "string",
    "msg": "string",
    "data": {}
  }
  ```

### 4. Specific Endpoints

- notes - accepts one or two mandatory path params

  - region - name of region
  - state - name of state
  - lga - name of lga

#### i. get all lgas in a state

- ```c
  http://localhost:8000/api/v1/nigeria/{region}/{state}/lgas
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

#### ii. get all lgas in a region

- ```c
  http://localhost:8000/api/v1/nigeria/{region}/lgas
  ```

- response

- ```json
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

- ```c
  http://localhost:8000/api/v1/nigeria/{region}/states
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

- ```js
  // app.ts

  // middlewares
  app.set('trust proxy', 1);
  app.use(limiter);
  app.use(cors());
  app.use(express.json());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

  // endpoint
  app.use('/api/v1/nigeria', authRouter);
  app.use('/api/v1/nigeria', checkApiKey, localeRouter);
  app.use('/api/v1/nigeria', checkApiKey, adminRouter);

  // test api
  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'api working...',
    });
  });
  ```

- ```js
  // custom - error.js;

  export interface CustomError extends Error {
    message: string;
    statusCode: number;
  }

  export default class customApiError extends Error {
    statusCode: number;
    message: any;

    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  ```

## Documentation

- #### link - (https://capstone-portfolio-project-at-altschool.onrender.com/api-docs)

    <p align="center">
      <img src="./img/Screenshot%20from%202024-02-25%2008-22-12.png">
    </p>

    <p align="center">
      <img src="./img/Screenshot%20from%202024-02-25%2008-22-31.png">
    </p>

    <p align="center">
      <img src="./img/Screenshot%20from%202024-02-25%2008-22-48.png">
    </p>

     <p align="center">
      <img src="./img/Screenshot%20from%202024-02-25%2008-22-54.png">
    </p>
