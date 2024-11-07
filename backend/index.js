require('dotenv').config()
const configdb=require('./db')
const express =require('express')
const cors=require('cors')
const {checkSchema}=require('express-validator')
const {userValidationSchema,otpValidationSchema}=require('./app/validations/login-validation')
const loginCltr=require('./app/controllers/login-cltr')
const app=express()
app.use(cors())
app.use(express.json())
configdb()

app.post('/login',checkSchema(userValidationSchema),loginCltr.login)
app.post('/otp/:userId',checkSchema(otpValidationSchema),loginCltr.otp)
app.get('/:userId',loginCltr.info)

app.listen(process.env.PORT,()=>{
    console.log('server running successfully')
})
