import { useState } from "react";
import { ethers } from "ethers";

export default function WalletConnect() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");
  
  const connectWallet = async () => {
       const provider = new ethers.providers.Web3Provider(window.ethereum);
    setError("");
    try {
      if (typeof window.ethereum === "undefined") {
        setError("MetaMask not installed.");
        return;
      }

      if (!window.ethereum.isMetaMask) {
        setError("Only MetaMask is supported. Please disable Phantom.");
        return;
      }
      if (window.ethereum == null) {

    console.log("MetaMask not installed; using read-only defaults")
    provider = ethers.getDefaultProvider()

} else {

    provider = new ethers.BrowserProvider(window.ethereum)
    signer = await provider.getSigner();
}

   
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      console.log("✅ Connected:", address);

      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0] || null);
      });
    } catch (err) {
      console.error("❌ Wallet connection failed:", err);
      setError("Connection rejected or failed.");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      {account ? (
        <p className="text-green-700 font-semibold">
          ✅ Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Connect MetaMask Wallet
        </button>
      )}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
