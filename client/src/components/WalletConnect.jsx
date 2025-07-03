import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'

const WalletConnect = () => {
    const [account, setAccount] = useState(null);
    const connectWallet = async()=>{
        if(window.ethereum){
        try {
            const account = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })
            const provider = new ethers.provider.Web3Provider(window.ethereum)
           const res =  await provider.send("eth_requestAccounts", []);
           const signer = provider.getSigner()
            console.log(signer);
            
            console.log(account);
            
            setAccount(account[0])
        } catch (error) {
            
        }
    }else{
        alert('Please install MetaMask')
    }
}

useEffect(()=>{
    window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || null);
})
})


  return (
    <div className="p-4 border rounded-lg shadow-md w-fit bg-white">
      {account ? (
        <p className="text-green-600 font-semibold">
          Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      )}
    </div>
  )
}

export default WalletConnect