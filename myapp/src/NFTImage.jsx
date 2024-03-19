function NFTImage({ index, contentId }) {
    const metadataUri = `https://gateway.pinata.cloud/ipfs/${contentId}/${index}.json`;
    const imageUri = `https://gateway.pinata.cloud/ipfs/${contentId}/${index}.png`;
  
    return (
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure><img src={imageUri} alt={`NFT ${index}`} /></figure>
        <div className="card-body">
          <h2 className="card-title">NFT #{index}</h2>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Mint</button>
          </div>
        </div>
      </div>
    );
}
export default NFTImage;

  