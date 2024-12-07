import {Route,Routes} from 'react-router-dom'
import Login from './component/Login';
import Otp from './component/Otp';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/nav.png'
function App() {
  return (
    <div >
      {/* added home page */}
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: '#0B1420', padding: '1rem' }}
      >
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <img
              src={logo}
              alt="Logo"
              style={{
                width: '146.82px',
                height: '45px',
                opacity: 1,
                marginLeft: '62px',
                marginTop: '12px',
              }}
            />
          </div>
        </div>
      </nav>
      {/* added footer section */}
        <Routes>
        <Route path='/' element={<Login/>}/>

        <Route path='/otp/:id' element={<Otp/>}/>
        </Routes>
    </div>
  );
}

export default App;
