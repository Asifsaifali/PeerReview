import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
// import WalletConnect from './components/WalletConnect'
import Callback from './components/Callback'

function App() {

  const handleGitHubLogin = async()=>{
    try {
      const clientId = "Ov23lihYxXlgo0oCXUWo"
      const redirectUri = 'http://localhost:5173/callback'
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user`;
      console.log("Inide function");
      

    } catch (error) {
      
    }
  }
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <WalletConnect/> */}
    <button
  onClick={handleGitHubLogin}
  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
>
  Login with GitHub
</button>


{/* <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/callback" element={<Callback/>} />
  </Routes>
</BrowserRouter> */}
    
    </>
  )
}

export default App
