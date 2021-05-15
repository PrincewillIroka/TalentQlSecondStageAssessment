import express from 'express';
import { handleUserRegistration, handleUserLogin } from '../controllers/UserController';
import { userRegistrationData, userLoginData } from '../utils/validation/UserValidation';
import { validator } from '../utils/util';

const router = express.Router();

router.post('/registration', userRegistrationData, validator, handleUserRegistration);
router.post('/login', userLoginData, validator, handleUserLogin);

export default router;
