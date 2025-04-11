import logo from './logo.svg';
import './App.css';
import OneTimeBiography from './templete/OneTimeBiography';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Button } from "reactstrap";
import MainMenu from './templete/Menu'; // 
import Profile from './templete/Profile'; 
import Map from './templete/Map';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route>
            <Route path="/" element={<OneTimeBiography />} />
            <Route path="/home" element={<MainMenu />} /> 
            <Route path="home/map" element={<Map />} />
  
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
