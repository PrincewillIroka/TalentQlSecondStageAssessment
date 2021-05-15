import express from 'express';
import { handlePublishPost, handleDeletePost, handleGetPost, handleEditPost } from '../controllers/PostController';
import { publishPostData, deletePostData, editPostData } from '../utils/validation/PostValidation';
import { validator } from '../utils/util';
import { isValidUser } from '../middlewares/Authentication';

const router = express.Router();

router.post('/publish', publishPostData, validator, isValidUser, handlePublishPost);
router.get('/:postId', validator, isValidUser, handleGetPost);
router.delete('/', deletePostData, validator, isValidUser, handleDeletePost);
router.patch('/', editPostData, validator, isValidUser, handleEditPost);

export default router;
