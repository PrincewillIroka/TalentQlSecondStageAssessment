import express from 'express';
import { handlePublishPost, handleDeletePost, handleGetPost, handleEditPost, handleLikePost } from '../controllers/PostController';
import { publishPostData, deletePostData, editPostData, likePostData } from '../utils/validation/PostValidation';
import { validator } from '../utils/util';
import { isValidUser } from '../middlewares/Authentication';

const router = express.Router();

router.post('/publish', publishPostData, validator, isValidUser, handlePublishPost);
router.get('/:postId', validator, isValidUser, handleGetPost);
router.delete('/', deletePostData, validator, isValidUser, handleDeletePost);
router.patch('/', editPostData, validator, isValidUser, handleEditPost);
router.post('/like', likePostData, validator, isValidUser, handleLikePost);

export default router;
