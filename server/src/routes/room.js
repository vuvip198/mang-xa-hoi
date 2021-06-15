const express=require('express');
const router=express.Router();
const RoomController=require('../app/Controllers/RoomController')
const verifyToken=require('../app/MiddleWare/auth')

router.get('/getfull', RoomController.show);
router.post('/add', RoomController.add);
router.post('/update/:id', RoomController.update)


module.exports=router;