import express from 'express';
import { handlePublishPost, handleDeletePost, handleGetPost } from '../controllers/PostController';
import { publishPostData, deletePostData } from '../utils/validation/PostValidation';
import { validator } from '../utils/util';
import { isValidUser } from '../middlewares/Authentication';

const router = express.Router();

router.post('/publish', publishPostData, validator, isValidUser, handlePublishPost);
router.get('/:postId', validator, isValidUser, handleGetPost);
router.delete('/delete', deletePostData, validator, handleDeletePost);

export default router;
