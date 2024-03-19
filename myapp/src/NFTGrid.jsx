import React from 'react';
import NFTCard from './NFTCard'; // Updated NFTImage component

function NFTGrid({ totalMinted, contentId, web3, contract, account, mintNFT }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: totalMinted }).map((_, index) => (
        <NFTCard key={index} index={index} contentId={contentId} web3={web3} contract={contract} account={account} mintNFT={mintNFT} />
      ))}
    </div>
  );
}

export default NFTGrid;
