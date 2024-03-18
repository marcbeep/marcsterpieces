import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import MarcsterpieceABI from './artifacts/contracts/Marcsterpiece.sol/Marcsterpiece.json'; // Import your contract ABI

function App() {
  const [count, setCount] = useState(0);
  const [currentAccount, setCurrentAccount] = useState('');
  const [contract, setContract] = useState(null);

  // Initialize ethers and connect to MetaMask
  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.send("eth_requestAccounts", []);
          setCurrentAccount(accounts[0]);
          
          const signer = provider.getSigner();
          const marcsterpieceContract = new ethers.Contract(
            'Your_Contract_Address',
            MarcsterpieceABI,
            signer
          );
          setContract(marcsterpieceContract);
        } catch (error) {
          console.error("Error connecting to MetaMask", error);
        }
      } else {
        console.log("MetaMask is not installed");
      }
    };

    init();
  }, []);

  // Example interaction with the contract
  const interactWithContract = async () => {
    if (!contract) return;
    try {
      // Example: calling a contract read method
      const data = await contract.yourContractMethodNameHere();
      console.log(data);
    } catch (error) {
      console.error("Error interacting with the contract", error);
    }
  };

  return (
    <>
      <div>
        <h1>Vite + React + Ethers</h1>
        {currentAccount && <p>Connected account: {currentAccount}</p>}
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button onClick={interactWithContract}>
            Interact with Contract
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

