import React from 'react'
import Login from './Login'

const HomePage = () => {
  return (
    <>
        <Login/>
        <div className="p-4">   
            <h1 className="text-2xl font-bold mb-4">Welcome to Peer Review DAO</h1>
            <p className="text-gray-700">
                This is a decentralized platform for peer reviews. Connect your wallet and start reviewing!
            </p>
        </div>
    </>
  )
}

export default HomePage