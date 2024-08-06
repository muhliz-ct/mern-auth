import express from 'express';
import { google, signin, signup, signout, userData , deleteUser } from '../controllers/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';



const router = express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google",google);
router.get('/signout',signout)
router.get('/admin',verifyToken ,userData)
router.delete('/userDelete/:id',verifyToken ,deleteUser)

export default router;