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

notes on app usage

#### 1. The population object part of the response data contains three key value pairs

##### a.) Total population - which is the population based on 2006 population census data

##### b.) Estimate population which is the estimated population of state for the year 2022

##### c.) Density of the region based on the 2006 population censusu stat

### General Endpoints

i. get all regions and associated states metadata

```c
$ http://localhost:8000/api/v1/nigeria/regions
```

ii. get all states and associated lgas metadata

```c
$ http://localhost:8000/api/v1/nigeria/states
```

iii. get all lgas

```c
$ http://localhost:8000/api/v1/nigeria/lgas
```

### Search

iii. secrch for region , state, or lga
it accepts a query paramater named keyword

```c
$ http://localhost:8000/api/v1/nigeria/search?keyword=Abuja
```
