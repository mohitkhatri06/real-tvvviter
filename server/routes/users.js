import express from 'express';
import {
   getUser,
   getUserFollowers,
   addRemoveFollower,
   getUserFollowings,
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', verifyToken, getUser);
router.get('/:id/followers', verifyToken, getUserFollowers);
router.get('/:id/followings', verifyToken, getUserFollowings);

router.patch('/:id/:followerId', verifyToken, addRemoveFollower);

export default router;
