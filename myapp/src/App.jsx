import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import MarcsterpieceABI from './artifacts/contracts/Marcsterpiece.sol/Marcsterpiece.json';
import Balance from './Balance';
import NFTImage from './NFTImage'; 

const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const contentId = 'QmWDvftEJszohJCKKKLpbpYsFg6F7DX1xj4BXUqFR7uNni';

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [totalMinted, setTotalMinted] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadWeb3AndContract = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const tempContract = new web3Instance.eth.Contract(MarcsterpieceABI.abi, contractAddress);
          setContract(tempContract);

          const accounts = await web3Instance.eth.getAccounts();
          setCurrentAccount(accounts[0]);

          // Fetch total minted NFTs
          const total = await tempContract.methods.totalMinted().call();
          setTotalMinted(parseInt(total));
        } catch (error) {
          setErrorMessage(`Initialization failed: ${error.message}`);
        }
      } else {
        setErrorMessage("MetaMask is not installed. Please consider installing to your browser: https://metamask.io/");
      }
    };

    loadWeb3AndContract();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="mb-6 text-4xl font-bold text-gray-900">React Ethereum DApp</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {currentAccount ? (
          <>
            <p className="mb-4">Connected Account: {currentAccount}</p>
            <Balance web3={web3} account={currentAccount} />
            {Array.from({ length: totalMinted }).map((_, i) => (
              <NFTImage key={i} index={i} contentId={contentId} web3={web3} contract={contract} account={currentAccount} />
            ))}
          </>
        ) : (
          <button className="btn btn-primary" onClick={() => window.location.reload()}>Connect to MetaMask</button>
        )}
      </div>
    </div>
  );
}

export default App;

