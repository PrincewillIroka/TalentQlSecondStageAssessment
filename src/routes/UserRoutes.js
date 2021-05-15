import express from 'express';
import { handleUserRegistration, handleUserLogin, handleResetPassword } from '../controllers/UserController';
import { userRegistrationData, userLoginData, resetPasswordData } from '../utils/validation/UserValidation';
import { validator } from '../utils/util';
import { isValidUser } from '../middlewares/Authentication';

const router = express.Router();

router.post('/registration', userRegistrationData, validator, handleUserRegistration);
router.post('/login', userLoginData, validator, handleUserLogin);
router.patch('/resetPassword', resetPasswordData, validator, isValidUser, handleResetPassword);

export default router;
