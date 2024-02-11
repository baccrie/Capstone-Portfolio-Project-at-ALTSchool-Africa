const express = require('express');
const signUp = require('../controllers/auth');

const router = express.Router();

router.post('/auth/signup', signup);
