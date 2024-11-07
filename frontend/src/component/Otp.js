

import { useParams } from "react-router-dom"
import { useState,useEffect } from 'react'
import axios from '../config/axios'
import bg from '../images/bg.png'
import logo from '../images/logo.png'
import containerbg from '../images/containerBg.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'
import { FaEdit } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export default function Otp() {
    const { id } = useParams()
    const [email,setEmail]=useState('')
    const [otp, setOtp] = useState(new Array(4).fill(""))
    const [clientErrors, setClientErrors] = useState({})
    const errors = {}
    const navigate=useNavigate()
    useEffect(()=>{
        fetchDetails()
        
    },[])
   

    const fetchDetails=async()=>{
         const response =await axios.get(`/${id}`)
         setEmail(response.data.email)
    }
    
    const runValidations = () => {
        if (otp.join("").trim().length === 0) {
            errors.otp = 'OTP is required'
        }else if(otp.join("").trim().length < 4){
             errors.otp = 'OTP should be 4 digits'
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        runValidations()
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post(`/otp/${id}`, { otp : otp.join("") })
               
                if(response?.data?.success){
                    Swal.fire({
                        title: 'Success',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'Ok'
                      })
                }
            } catch (err) {
                console.log(err)
                Swal.fire({
                    title: 'Failed',
                    text: err.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
                setClientErrors({})
            }
        } else {
            setClientErrors(errors)
            
        }
    }

    const handleChange = (element, index) => {
        console.log({element:element.value,index})
        if (isNaN(element.value)) return
        const newOtp = [...otp]
        newOtp[index] = element.value
        console.log(newOtp)
        setOtp(newOtp);

        
        if (element.nextSibling && element.value !== "") {
            element.nextSibling.focus()
        }
    }

   
     const handleClick=()=>{
        navigate('/')
    }
    return (
        <div style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div className="container p-4 shadow-lg"
                style={{
                    width: '400px',
                    height: '500px',
                    backgroundImage: `url(${containerbg})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    borderRadius: '8px',
                    padding: '32px',
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <img
                    src={logo}
                    alt="Top Logo"
                    className="img-fluid mb-2"
                    style={{ width: '200px', height: '200px' }}
                />
                <h3 className="text-center " style={{ color: 'white'}}>OTP</h3>
                <h5 className="text-center mb-3" style={{ color: 'grey'}}>Please enter otp sent to</h5>
                <h6 className="text-center mb-3" style={{ color: 'white'}}>{email} {'  '} <FaEdit style={{color:'blue'}} onClick={handleClick} /></h6> 
                
                <form onSubmit={handleSubmit} className="text-center">
                    <div className="d-flex justify-content-center mb-3">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                className="form-control text-center mx-1"
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                maxLength="1"
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    fontSize: '24px',
                                    borderRadius: '6px',
                                    border: '1px solid #ced4da',
                                }}
                            />
                        ))}
                    </div>
                    {clientErrors.otp && (
                        <small className="text-danger">{clientErrors.otp}</small>
                    )}
                    <button type="submit"  className="btn w-100"
                            style={{
                            backgroundColor: '#F4BC2E',
                            color: 'black',
                            fontSize: '18px',
                            padding: '10px',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            }}>Proceed</button>
              </form>
        </div>
     </div>
    )
}


// import { useParams, useNavigate } from "react-router-dom"
// import { useState, useEffect } from 'react'
// import axios from '../config/axios'
// import bg from '../images/bg.png'
// import logo from '../images/logo.png'
// import containerbg from '../images/containerBg.png'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import Swal from 'sweetalert2'
// import { FaEdit } from "react-icons/fa"

// export default function Otp() {
//   const { id } = useParams()
//   const [email, setEmail] = useState('')
//   const [otp, setOtp] = useState(new Array(4).fill(""))
//   const [clientErrors, setClientErrors] = useState({})
//   const errors = {}
//   const navigate = useNavigate()

//   useEffect(() => {
//     fetchDetails()
//   }, [])

//   const fetchDetails = async () => {
//     const response = await axios.get(`/${id}`)
//     setEmail(response.data.email)
//   }
//   console.log(email)

//   const runValidations = () => {
//     if (otp.join("").trim().length === 0) {
//       errors.otp = 'OTP is required'
//     } else if (otp.join("").trim().length < 4) {
//       errors.otp = 'OTP should be 4 digits'
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     runValidations()
//     if (Object.keys(errors).length === 0) {
//       try {
//         const response = await axios.post(`/otp/${id}`, { otp: otp.join("") })
//         if (response?.data?.success) {
//           Swal.fire({
//             title: 'Success',
//             text: response.data.message,
//             icon: 'success',
//             confirmButtonText: 'Ok'
//           })
          
//         }
//       } catch (err) {
//         Swal.fire({
//           title: 'Failed',
//           text: err.response.data.message,
//           icon: 'error',
//           confirmButtonText: 'Ok'
//         })
//         setClientErrors({})
//       }
//     } else {
//       setClientErrors(errors)
//     }
//   }

//   const handleChange = (element, index) => {
//     if (isNaN(element.value)) return
//     const newOtp = [...otp]
//     newOtp[index] = element.value
//     setOtp(newOtp)
//     if (element.nextSibling && element.value !== "") {
//       element.nextSibling.focus()
//     }
//   }

//   const handleClick = () => {
//     navigate('/')
//   }

//   return (
//     <div className="d-flex align-items-center justify-content-center min-vh-100" style={{
//       backgroundImage: `url(${bg})`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//     }}>
//       <div className="container p-4 shadow-lg w-100" style={{
//         maxWidth: '400px',
//         backgroundImage: `url(${containerbg})`,
//         backgroundSize: '100% 100%',
//         borderRadius: '8px',
//         padding: '32px',
//         boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}>
//         <img src={logo} alt="Top Logo" className="img-fluid mb-4" style={{ width: '150px' }} />
//         <h5 className="text-center mb-3 text-white">Please enter otp sent to</h5>
//         <h6 className="text-center mb-3 text-white">{email} <FaEdit style={{ color: 'blue' }} onClick={handleClick} /></h6>
//         <form onSubmit={handleSubmit} className="text-center">
//           <div className="d-flex justify-content-center mb-3">
//             {otp.map((data, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 className="form-control text-center mx-1"
//                 value={data}
//                 onChange={(e) => handleChange(e.target, index)}
//                 maxLength="1"
//                 style={{
//                   width: '50px',
//                   height: '50px',
//                   fontSize: '24px',
//                   borderRadius: '6px',
//                   border: '1px solid #ced4da',
//                 }}
//               />
//             ))}
//           </div>
//           {clientErrors.otp && (
//             <small className="text-danger">{clientErrors.otp}</small>
//           )}
//           <button type="submit" className="btn w-100" style={{
//             backgroundColor: '#F4BC2E',
//             color: 'black',
//             fontSize: '18px',
//             padding: '10px',
//             borderRadius: '6px',
//             fontWeight: 'bold',
//           }}>Proceed</button>
//         </form>
//       </div>
//     </div>
//   )
// }
