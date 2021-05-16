import express from 'express';
import {
	handlePublishPost,
	handleDeletePost,
	handleGetPost,
	handleEditPost,
	handleLikePost,
	handleReplyPost,
} from '../controllers/PostController';
import {
	deletePostData,
	editPostData,
	likePostData,
	replyPostData,
} from '../utils/validation/PostValidation';
import { validator } from '../utils/util';
import { isValidUser } from '../middlewares/Authentication';

const router = express.Router();

router.post('/publish', isValidUser, handlePublishPost);
router.get('/:postId', validator, isValidUser, handleGetPost);
router.delete('/', deletePostData, validator, isValidUser, handleDeletePost);
router.patch('/', editPostData, validator, isValidUser, handleEditPost);
router.post('/like', likePostData, validator, isValidUser, handleLikePost);
router.post('/reply', replyPostData, validator, isValidUser, handleReplyPost);

export default router;
