import express from 'express';
import { handlePublishPost, handleDeletePost } from '../controllers/PostController';
import { publishPostData, deletePostData } from '../validation/PostValidation';
import { validator } from '../utils/util';

const router = express.Router();

router.post('/publish', publishPostData, validator, handlePublishPost);
router.delete('/delete', deletePostData, validator, handleDeletePost);

export default router;
