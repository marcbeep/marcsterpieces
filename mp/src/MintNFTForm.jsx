import React, { useState } from 'react';

function MintNFTForm({ contract, account, web3 }) {
  const [tokenURI, setTokenURI] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const mintNFT = async () => {
    if (contract && account) {
      try {
        await contract.methods.mintNFT(account, tokenURI).send({ from: account, value: web3.utils.toWei("0.01", "ether") });
        setMessage('NFT minted successfully!');
        setIsError(false);
      } catch (error) {
        setMessage(`Minting failed: ${error.message}`);
        setIsError(true);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Token URI"
        value={tokenURI}
        onChange={(e) => setTokenURI(e.target.value)}
        className="input input-bordered w-full max-w-xs"
      />
      <button className="btn btn-primary mt-4" onClick={mintNFT}>Mint NFT</button>
      {message && (
        <p className={`mt-4 ${isError ? 'text-red-500' : 'text-green-500'}`}>{message}</p>
      )}
    </div>
  );
}

export default MintNFTForm;
