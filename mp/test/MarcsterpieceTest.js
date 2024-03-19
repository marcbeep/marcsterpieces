// Import the entire hardhat default export and then destructure to get ethers
import hardhat from 'hardhat';
const { ethers } = hardhat;
import { expect } from "chai";


describe("Marcsterpiece", function () {
  let marcsterpiece;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    const Marcsterpiece = await ethers.getContractFactory("Marcsterpiece");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    marcsterpiece = await Marcsterpiece.deploy();
  });

  describe("Minting", function () {
    it("should mint a new token with unique URI", async function () {
      const mintPrice = await marcsterpiece.mintPrice();
      const tokenURI = "uniqueTokenURI";
      
      await expect(marcsterpiece.connect(addr1).mintNFT(addr1.address, tokenURI, { value: mintPrice }))
        .to.emit(marcsterpiece, "Transfer")
        .withArgs(ethers.constants.AddressZero, addr1.address, 1);

      expect(await marcsterpiece.isUriOwned(tokenURI)).to.equal(true);
    });

    it("should fail minting with insufficient Ether", async function () {
      const insufficientAmount = ethers.utils.parseEther("0.001"); // Correct usage
      const tokenURI = "anotherUniqueTokenURI";

      await expect(marcsterpiece.connect(addr1).mintNFT(addr1.address, tokenURI, { value: insufficientAmount }))
        .to.be.revertedWith("Not enough Ether sent.");
    });

    it("should prevent minting with duplicate URI", async function () {
      const mintPrice = await marcsterpiece.mintPrice();
      const tokenURI = "duplicateTokenURI";
      await marcsterpiece.connect(addr1).mintNFT(addr1.address, tokenURI, { value: mintPrice });

      // Attempt to mint again with the same URI
      await expect(marcsterpiece.connect(addr2).mintNFT(addr2.address, tokenURI, { value: mintPrice }))
        .to.be.revertedWith("URI is already owned.");
    });
  });
});
