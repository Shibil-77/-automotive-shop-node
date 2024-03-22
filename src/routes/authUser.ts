


import express from 'express'
import  {register,login} from '../controllers/auth'
const router = express.Router()


router.post('/signup',register)

// router.get('/verify/:userId',verifyRegistration)

// router.get('/timeReset/:id',emailReset)

router.post('/login',login)

// router.post('/forgotPassword',forgotPassword)

// router.post('/resetPassword/:id/',resetPassword)


export default router  