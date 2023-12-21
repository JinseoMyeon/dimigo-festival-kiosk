import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Main from './pages/main';
import Attendance from './pages/attendance';
import Time from './pages/time';
import Order from './pages/order';
import Payment from './pages/payment';
import Done from './pages/done';

// reset localStorage value

function App() {
  if (!localStorage.getItem('adminPassword')) {
    const password = window.prompt("키오스크 활성화 비밀번호를 입력해 주세요.");
    localStorage.setItem('Authorization', password);
  }
  
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
