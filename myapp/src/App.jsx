import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import MarcsterpieceABI from './artifacts/contracts/Marcsterpiece.sol/Marcsterpiece.json';

const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  // Add a new state variable to hold the connection status
const [isContractConnected, setIsContractConnected] = useState(false);

useEffect(() => {
  if (!currentAccount) return;

  try {
    const tempProvider = new Web3(window.ethereum);
    const tempContract = new tempProvider.eth.Contract(MarcsterpieceABI.abi, contractAddress);
    setContract(tempContract);
    setIsContractConnected(true); // Update the connection status
    setErrorMessage('');
  } catch (error) {
    setErrorMessage(`Error initializing contract: ${error.message}`);
    setIsContractConnected(false); // Update the connection status on failure
  }
}, [currentAccount]);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      const marcsterpieceContract = new web3Instance.eth.Contract(MarcsterpieceABI.abi, contractAddress);
      setContract(marcsterpieceContract);
    } else {
      setErrorMessage('Please install MetaMask to use this app.');
    }
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const mintNFT = async () => {
    if (!contract) return;
    try {
      // Adjust parameters as needed for your contract
      await contract.methods.mintNFT("TOKEN_URI").send({ from: currentAccount, value: web3.utils.toWei("0.01", "ether") });
      console.log('NFT minted!');
    } catch (error) {
      setErrorMessage(`Error minting NFT: ${error.message}`);
    }
  };

  return (
    <div>
  <h1>React Ethereum DApp with Web3.js</h1>
  {errorMessage && <p>Error: {errorMessage}</p>}
  {currentAccount && <p>Connected Account: {currentAccount}</p>}
  {isContractConnected ? <p>Contract Connected ✅</p> : <p>Contract Not Connected ❌</p>}
  {currentAccount && (
    <button onClick={mintNFT}>Mint NFT</button>
  )}
  {!currentAccount && (
    <button onClick={connectWallet}>Connect to MetaMask</button>
  )}
</div>
  );
}

export default App;

