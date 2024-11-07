const User=require('../models/user')
const {validationResult}=require('express-validator')
const bcryptjs=require('bcryptjs')
const sendOTPEmail=require('../../utils/mail')
const loginCltr={}
loginCltr.login=async(req,res)=>{
    try{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const body=req.body  
        const otp = await sendOTPEmail(body.email)
      
        const salt = await bcryptjs.genSalt() 
        const hashPassword = await bcryptjs.hash(otp, salt)
        const user=new User(body)   
        user.otp = hashPassword
        user.otpExpires = Date.now() + 10 * 60 * 1000
        await user.save()
        res.status(200).json(user)   

    }catch(err){
        res.status(500).json({ message: 'Server error' })
    }
}


loginCltr.otp=async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body
    const id=req.params.userId
    
    try {
      const user = await User.findById(id)
      const otp= await bcryptjs.compare( body.otp , user.otp)   
      if ( !otp || user.otpExpires < Date.now()) {
        return res.status(400).json({ message: 'Invalid or expired OTP',success:false })
      }
      user.otp = undefined
      user.otpExpires = undefined
      await user.save()
      res.status(200).json({ message: 'Login successful',success:true })
    } catch (error) {
        
      res.status(500).json({ message:'Server error',success:false })
    }
  }


  loginCltr.info=async(req,res)=>{
    try{
      const id=req.params.userId
      const user = await User.findById(id)
      if(user){
        return res.status(200).json(user)
      }
     return res.status(404).json({message:'No Record'})
    }
    catch(err){
      res.status(500).json({ message:'Server error' })
    }
  }
module.exports=loginCltr