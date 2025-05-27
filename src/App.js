
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './templete/LoginScreen';
import Signup from './templete/SignupScreen';
import MainScreen from './templete/mainScreen';
import EditScreen from './templete/editScreen';


function App() {
  return (
    <div>
      
     
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<MainScreen />} />
          <Route path="/edit/:id" element={<EditScreen />} />
        </Routes>
      </Router>
      <ToastContainer />
      
    
    </div>
  );
}

export default App;
