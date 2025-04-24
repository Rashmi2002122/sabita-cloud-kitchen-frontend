
import './App.css';
import OneTimeBiography from './templete/OneTimeBiography';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainMenu from './templete/Menu'; 

import Map from './templete/Map';
import CheckoutPage from './templete/CheckoutPage'; 
import { CartProvider } from './templete/CartContext';

import Order from './templete/Order';

function App() {
  return (
    <div>
      
      <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<OneTimeBiography />} />
          <Route path="/home" element={<MainMenu />} /> 
          <Route path="/home/map" element={<Map />} />
          
          <Route path="/home/checkout" element={<CheckoutPage />} />
          <Route path="/home/checkout/order" element={<Order />} />
         
        </Routes>
      </Router>
      <ToastContainer />
      </CartProvider >
    
    </div>
  );
}

export default App;
