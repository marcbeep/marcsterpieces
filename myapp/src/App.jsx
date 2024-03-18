import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import MarcsterpieceABI from './artifacts/contracts/Marcsterpiece.sol/Marcsterpiece.json';
import Balance from './Balance'; 

const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const tempContract = new web3Instance.eth.Contract(MarcsterpieceABI.abi, contractAddress);
          setContract(tempContract);

          const accounts = await web3Instance.eth.getAccounts();
          setCurrentAccount(accounts[0]);
        } catch (error) {
          setErrorMessage(`Initialization failed: ${error.message}`);
        }
      } else {
        setErrorMessage("MetaMask is not installed.");
      }
    };

    loadWeb3();
  }, []);

  const mintNFT = async (tokenURI) => {
    if (contract && currentAccount) {
      try {
        // Example URI
        const uri = tokenURI || "http://example.com/nft.json";
        await contract.methods.mintNFT(currentAccount, uri).send({ from: currentAccount, value: web3.utils.toWei("0.01", "ether") });
        console.log('NFT minted successfully.');
      } catch (error) {
        setErrorMessage(`Minting failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="mb-6 text-4xl font-bold text-gray-900">React Ethereum DApp Example</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {currentAccount ? (
          <>
            <p className="mb-4">Connected Account: {currentAccount}</p>
            <Balance web3={web3} account={currentAccount} />
            <button className="btn btn-primary mt-4" onClick={() => mintNFT("Your Token URI Here")}>Mint NFT</button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={() => setErrorMessage('Please refresh and connect MetaMask.')}>Connect to MetaMask</button>
        )}
      </div>
    </div>
  );
}

export default App;


