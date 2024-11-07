const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user:process.env.EMAIL,
    pass: process.env.PASS_KEY,
  },
});

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); 
  };
  
const sendOTPEmail = async (email) => {
    const otp = generateOTP()
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP for Verification',
      text: ` Your OTP : ${otp} `,
  
    }
  
    try {
      await transporter.sendMail(mailOptions)
     
      return otp
    } catch (error) {
      console.error('Error sending OTP email:', error)
    }
  }

  module.exports=sendOTPEmail
