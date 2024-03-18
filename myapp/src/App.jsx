import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import MarcsterpieceABI from './artifacts/contracts/Marcsterpiece.sol/Marcsterpiece.json';

const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [contract, setContract] = useState(null);

  // Function to connect to MetaMask
  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(accounts[0]);
        setErrorMessage(''); // Clear any existing errors
      } catch (error) {
        setErrorMessage(`Error connecting to MetaMask: ${error.message}`);
      }
    } else {
      setErrorMessage('MetaMask is not installed.');
    }
  }

  // Initialize ethers upon wallet connection
  useEffect(() => {
    if (!currentAccount) return;

    try {
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      const tempSigner = tempProvider.getSigner();
      const tempContract = new ethers.Contract(contractAddress, MarcsterpieceABI.abi, tempSigner);
      setContract(tempContract);
    } catch (error) {
      setErrorMessage(`Error initializing contract: ${error.message}`);
    }
  }, [currentAccount]);

  // Example contract interaction: Adjust this example as per your contract's methods
  async function mintNFT() {
    if (!contract) {
      setErrorMessage('Contract not loaded.');
      return;
    }

    try {
      const transaction = await contract.mintNFT(currentAccount, "TOKEN_URI", { value: ethers.utils.parseEther("0.01") });
      await transaction.wait();
      console.log('NFT minted!');
      setErrorMessage(''); // Clear any existing errors
    } catch (error) {
      setErrorMessage(`Error minting NFT: ${error.message}`);
    }
  }

  return (
    <div>
      <h1>React Ethereum DApp Example</h1>
      {errorMessage && <p className="error">Error: {errorMessage}</p>}
      {currentAccount ? (
        <>
          <p>Connected Account: {currentAccount}</p>
          <button onClick={mintNFT}>Mint NFT</button>
        </>
      ) : (
        <button onClick={connectWallet}>Connect to MetaMask</button>
      )}
    </div>
  );
}

export default App;
