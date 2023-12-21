import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './pages/main';
import Attendance from './pages/attendance';
import Time from './pages/time';
import Order from './pages/order';
import Payment from './pages/payment';
import Done from './pages/done';

// reset localStorage value

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/attendance" element={<Attendance/>} />  
          <Route path="/time" element={<Time/>} />
          <Route path="/order" element={<Order/>} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/done" element={<Done/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
