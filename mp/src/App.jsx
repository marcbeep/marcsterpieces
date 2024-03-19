import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import MarcsterpieceABI from './artifacts/contracts/Marcsterpiece.sol/Marcsterpiece.json';
import Balance from './Balance';
import NFTGrid from './NFTGrid'; // New component to manage grid layout

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const contentId = 'QmWDvftEJszohJCKKKLpbpYsFg6F7DX1xj4BXUqFR7uNni';

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [totalMinted, setTotalMinted] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [minting, setMinting] = useState(false); 

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
          updateTotalMinted(tempContract);
        } catch (error) {
          setErrorMessage(`Initialization failed: ${error.message}`);
        }
      } else {
        setErrorMessage("MetaMask is not installed. Please consider installing to your browser: https://metamask.io/");
      }
    };

    loadWeb3AndContract();
  }, []);

  // Extracted the update function to reuse after minting
  const updateTotalMinted = async (tempContract) => {
    const total = await tempContract.methods.totalMinted().call();
    setTotalMinted(parseInt(total));
  };

  // Function to mint NFT
  const mintNFT = async () => {
    if (!contract || !currentAccount) {
      setErrorMessage("Contract not loaded or wallet not connected.");
      return;
    }
    try {
      setMinting(true);
      const tokenURI = `${contentId}/${totalMinted}.json`; // Assuming tokenURI follows this pattern
      await contract.methods.mintNFT(currentAccount, tokenURI).send({ from: currentAccount, value: web3.utils.toWei("0.01", "ether") });
      await updateTotalMinted(contract);
      setMinting(false);
    } catch (error) {
      setErrorMessage(`Minting failed: ${error.message}`);
      setMinting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="mb-6 text-4xl font-bold text-gray-900">marcsterpieces dapp</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {currentAccount ? (
          <>
            <p className="mb-4">Connected Account: {currentAccount}</p>
            <Balance web3={web3} account={currentAccount} />
            <NFTGrid totalMinted={totalMinted + 1} contentId={contentId} web3={web3} contract={contract} account={currentAccount} mintNFT={mintNFT} />
          </>
        ) : (
          <button className="btn btn-primary" onClick={() => window.location.reload()}>Connect to MetaMask</button>
        )}
      </div>
    </div>
  );
}

export default App;

