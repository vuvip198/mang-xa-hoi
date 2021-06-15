const express=require('express');
const router=express.Router();
const AuthController=require('../app/Controllers/AuthController')
const verifyToken=require('../app/MiddleWare/auth')

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/', verifyToken, AuthController.index)


module.exports=router;