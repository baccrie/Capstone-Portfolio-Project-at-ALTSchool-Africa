import express from 'express';
import { signUp } from '../controllers/auth';

const router = express.Router();

router.post('/auth/signup', signUp);

export default router;
