import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WalletConnect from './components/WalletConnect'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <WalletConnect/>
    
    </>
  )
}

export default App
