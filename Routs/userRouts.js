import  Express  from "express";
import * as userController from '../Controller/userController.js'
import authorise from "../Middlewares/Authmiddleware.js";



const router = Express.Router()

router.post('/signup',userController.signupUser)

router.post('/login',userController.loginUser)

router.get('/users',authorise,userController.getUsers)

router.post('/user/create',authorise,userController.createUser)

router.put('/user/update/:id',authorise,userController.updateUser)

router.delete('/user/delete/:id',authorise,userController.deleteUser)

router.post('/user/logout',userController.logoutUser)

export default router