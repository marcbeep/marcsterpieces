# mft

Minting NFTs.

---

### Project Overview: Marcsterpieces

- **Objective**: Marcsterpieces is a Web3 decentralized application (DApp) aimed at allowing users to mint NFTs representing unique art images by transferring Ethereum (ETH).
- **Key Components**:
  - 165 unique art images uploaded to IPFS
  - Smart contract deployment for NFT minting
  - Frontend application built with React
  - Use of Hardhat for smart contract development
  - Integration with MetaMask for wallet management
  - Ether.js for blockchain interactions

#### Phase 1: Art Asset Preparation

1. Ensure each art piece has a corresponding metadata file (`.json`) and image files (`.png`, `.svg`) uploaded to IPFS using Pinata.
2. Verify the integrity and accessibility of the files on the IPFS network.

#### Phase 2: Smart Contract Development

1. Utilize OpenZeppelin to create an ERC-721 smart contract for NFT minting.
2. Customize the contract to include a `payToMint` function, specifying payment requirements in ETH.
3. Implement unique URI management to associate each NFT with its IPFS-hosted art piece and metadata.
4. Test the smart contract extensively on a local Ethereum network using Hardhat's local network feature.

#### Phase 3: Frontend Application Development

1. Develop a responsive and user-friendly interface with React.
2. Integrate MetaMask detection logic to guide users through connecting their wallets.
3. Use ethers.js to interact with the Ethereum blockchain.
4. Display total minted tokens dynamically and create a gallery view for available art pieces.
5. Implement minting functionality, including MetaMask integration and execution of the `payToMint` method.

#### Phase 4: Deployment and Testing

1. Finalize smart contract development and deploy it to a testnet (e.g., Rinkeby) for public testing.
2. Deploy the React frontend to a suitable hosting service supporting DApps.
3. Conduct comprehensive testing involving real transactions on the testnet to ensure seamless operation.
4. Address any issues identified during testing.

#### Phase 5: Launch and Promotion

1. Deploy the smart contract to the Ethereum mainnet.
2. Update the DApp's frontend to interact with the mainnet contract address.
3. Engage with the community and potential users through social media, NFT forums, and crypto-related platforms to promote Marcsterpieces.
