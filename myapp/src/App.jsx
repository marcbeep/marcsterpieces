import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import MarcsterpieceABI from './artifacts/contracts/Marcsterpiece.sol/Marcsterpiece.json';

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contract, setContract] = useState(null);

  // Update with your contract address
  const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'; 

  // MetaMask Connect Function
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  };

  // Initialize Contract
  useEffect(() => {
    if (!currentAccount) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const marcsterpieceContract = new ethers.Contract(contractAddress, MarcsterpieceABI.abi, signer);
    setContract(marcsterpieceContract);
  }, [currentAccount]);

  // Mint NFT
  const mintNFT = async (tokenURI) => {
    if (!contract) return;
    try {
      const transaction = await contract.mintNFT(currentAccount, tokenURI, { value: ethers.utils.parseEther("0.01") });
      await transaction.wait();
      alert("NFT Minted Successfully!");
    } catch (error) {
      console.error("Error minting NFT", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {currentAccount ? (
          <div>
            <p>Wallet Connected: {currentAccount}</p>
            <button onClick={() => mintNFT("https://example.com/nft")}>Mint NFT</button>
          </div>
        ) : (
          <button onClick={connectWallet}>Connect MetaMask Wallet</button>
        )}
      </header>
    </div>
  );
}

export default App;
