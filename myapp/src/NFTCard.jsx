import React, { useEffect, useState } from 'react';

function NFTCard({ index, contentId, web3, contract, account, mintNFT }) {
  const [isMinted, setIsMinted] = useState(false);
  const imageUri = `https://gateway.pinata.cloud/ipfs/${contentId}/${index}.png`;
  const placeholderUri = 'https://placehold.co/256x256/edede9/d5bdaf/?text=?'; // Ensure you have a placeholder image available

  useEffect(() => {
    const checkMintedStatus = async () => {
      const metadataURI = `${contentId}/${index}.json`; // Adjust if your metadata structure is different
      // Ensure contract and metadataURI are correctly defined
      try {
        const result = await contract.methods.isUriOwned(metadataURI).call();
        console.log(`Is URI owned (NFT #${index}):`, result); // Logging the result
        setIsMinted(result);
      } catch (error) {
        console.error("Error checking minted status for NFT #" + index + ":", error);
      }
    };

    if (contract) {
      checkMintedStatus();
    }
  }, [contract, index, contentId]);
  

  // Adjust mintToken function to use web3
  const mintToken = async () => {
    // Use the existing mintNFT function but ensure it's adapted for web3 usage
    mintNFT(index);
  };

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure><img src={isMinted ? imageUri : placeholderUri} alt={`NFT ${index}`} /></figure>
      <div className="card-body">
        <h2 className="card-title">NFT #{index}</h2>
        <div className="card-actions justify-end">
          {!isMinted ? (
            <button className="btn btn-primary" onClick={mintToken}>Mint</button>
          ) : (
            <div className="badge badge-success">Already Minted!</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NFTCard;


  