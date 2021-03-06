import express from 'express';
import AuthRoutes from './UserRoutes';
import PostRoutes from './PostRoutes';

const router = express.Router();

router.use('/users', AuthRoutes);
router.use('/posts', PostRoutes);

export default router;
