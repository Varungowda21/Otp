import {useState} from 'react'
import validator from 'validator'
import { useNavigate } from 'react-router-dom'
import axios from '../config/axios'
import bg from '../images/bg.png'
import logo from '../images/logo.png'
import containerbg from '../images/containerBg.png'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Login(){
  const [email,setEmail]=useState('')
  const [clientErrors,setClientErrors]=useState({})
  const [serverErrors,setServerErrors]=useState(null)
  const [loading, setLoading] = useState(false)
  const errors={}
  const navigate=useNavigate()

  
  
  const runValidations = () => {
    if(email.trim().length == 0) {
        errors.email = 'email is required'
    } else if(!validator.isEmail(email)) {
        errors.email = 'invalid email format'
    }
   }

  
   const displayErrors = () => {
            if (typeof serverErrors === 'string') {
                return <p className="text-danger"> {serverErrors} </p>;
            } else {
                return (
                    <div>
                        <ul>
                            {serverErrors.map((ele, i) => (
                                <li key={i} className="text-danger"> {ele.msg} </li>
                            ))}
                        </ul>
                    </div>
                );
            }
        }

      

  const handleSubmit = async (e) => {
    e.preventDefault() 
    runValidations() 
    if(Object.keys(errors).length == 0 ) {
      setLoading(true)
        try { 
           setClientErrors({})
            const response = await axios.post('/login',{email:email}) 
            navigate(`/otp/${response.data._id}`)
        } catch(err) {
          setServerErrors(err.response.data.errors)
            setClientErrors({})
        }
        setLoading(false)
    } else {
     
        setClientErrors(errors)
        setServerErrors(null)
    }
}



   return <div  style={{
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
    
     
<div
        className="container p-4 shadow-lg"
        style={{
          width: '400px', 
          height: '500px', 
          backgroundImage: `url(${containerbg})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
         <img
          src={logo}
          alt="Top Logo"
          className="img-fluid mb-4"
          style={{ width: '200px',height:'200px' }} 
        />
        
        <h5 className="text-center mb-3"  style={{ color:'white' }} >Login</h5>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className="form-group mb-3">
            <label
              htmlFor="email"
              style={{ fontSize: '1.1rem', display: 'block', textAlign: 'center', marginBottom: '0.3rem' ,color:'white'}}
            >
             Login with Email ID
            </label>
            <input
              type="text"
              value={email}
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              style={{
                fontSize: '16px',
                padding: '8px',
                borderRadius: '6px',
              }}
            />
             { serverErrors && (
              <span  style={{ fontSize: '17px' }}>
                {displayErrors()}
              </span>
            )} 
            {clientErrors.email && (
              <span className="text-danger d-block text-center mt-2" style={{ fontSize: '14px' }}>
                {clientErrors.email}
              </span>
            )}
          </div>
          <button
            type="submit"
            
            className="btn w-100"
            style={{
              backgroundColor: '#F4BC2E',
              color: 'black',
              fontSize: '18px',
              padding: '10px',
              borderRadius: '6px',
              fontWeight: 'bold',
            }}
          >
             {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : null}
            {loading ? '' : 'Log In'}
          </button>
        </form>

      </div>

   </div>
}



