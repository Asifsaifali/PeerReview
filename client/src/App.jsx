import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
// import WalletConnect from './components/WalletConnect'
import Callback from './components/Callback'
import HomePage from './components/HomePage'
import UserProfile from './components/UserProfile'

function App() {

  useEffect(() => {
  fetch("http://localhost:3000/test")
    .then(res => res.json())
    .then(data => console.log("✅ Success:", data))
    .catch(err => console.error("❌ Error:", err));
}, []);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/callback" element={<Callback />} />
        <Route path='/profile' element = {<UserProfile/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
