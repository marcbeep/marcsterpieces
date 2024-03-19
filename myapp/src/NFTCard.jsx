function NFTCard({ index, contentId, isMinted }) { // isMinted will determine what to display
  const imageUri = `https://gateway.pinata.cloud/ipfs/${contentId}/${index}.png`;

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure><img src={imageUri} alt={`NFT ${index}`} /></figure>
      <div className="card-body">
        <h2 className="card-title">NFT #{index}</h2>
        <div className="card-actions justify-end">
          {isMinted ? (
            <div className="badge badge-success">Already Minted!</div>
          ) : (
            <button className="btn btn-primary" onClick={() => mintNFT(index)}>Mint</button>
          )}
        </div>
      </div>
    </div>
  );
}
export default NFTCard;


  