const mongoose=require('mongoose')
const {Schema,model}=mongoose
const userSchema=new Schema({
    email:String,
    otp:String,
    otpExpires:String,
},{timestamps:true})

const User=model('User',userSchema)

module.exports=User