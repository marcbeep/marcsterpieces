const Web3 = require('web3');
const { expect } = require('chai');
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); // Adjust 

const MarcsterpieceABI = require('../src/artifacts/contracts/Marcsterpiece.sol/Marcsterpiece.json').abi;
const MarcsterpieceBytecode = require('../src/artifacts/contracts/Marcsterpiece.sol/Marcsterpiece.json').bytecode;

describe("Marcsterpiece", function () {
  let marcsterpiece;
  let accounts;
  let owner;
  let addr1;
  let addr2;

  before(async function () {
    accounts = await web3.eth.getAccounts();
    owner = accounts[0];
    addr1 = accounts[1];
    addr2 = accounts[2];

    const MarcsterpieceContract = new web3.eth.Contract(MarcsterpieceABI);
    marcsterpiece = await MarcsterpieceContract.deploy({ data: MarcsterpieceBytecode })
      .send({ from: owner, gas: 6000000 });
  });

  describe("Minting", function () {
    it("should mint a new token with unique URI", async function () {
      const mintPrice = await marcsterpiece.methods.mintPrice().call();
      const tokenURI = "uniqueTokenURI";
      const receipt = await marcsterpiece.methods.mintNFT(addr1, tokenURI).send({ from: addr1, value: mintPrice, gas: 6000000 });

      // Manual check for the Transfer event
      const transferEventFound = receipt.events.some(event => event.event === "Transfer" && event.returnValues.to === addr1 && event.returnValues.tokenId === '1');
      expect(transferEventFound).to.equal(true);

      const isOwned = await marcsterpiece.methods.isUriOwned(tokenURI).call();
      expect(isOwned).to.equal(true);
    });

    it("should fail minting with insufficient Ether", async function () {
      const insufficientAmount = web3.utils.toWei("0.001", "ether");
      const tokenURI = "anotherUniqueTokenURI";

      try {
        await marcsterpiece.methods.mintNFT(addr1, tokenURI).send({ from: addr1, value: insufficientAmount, gas: 6000000 });
        // If the minting does not fail, force the test to fail
        expect.fail("The transaction should have failed but did not.");
      } catch (error) {
        expect(error.message).to.include("revert Not enough Ether sent.");
      }
    });

    it("should prevent minting with duplicate URI", async function () {
      const mintPrice = await marcsterpiece.methods.mintPrice().call();
      const tokenURI = "duplicateTokenURI";
      await marcsterpiece.methods.mintNFT(addr1, tokenURI).send({ from: addr1, value: mintPrice, gas: 6000000 });

      // Attempt to mint again with the same URI and expect failure
      try {
        await marcsterpiece.methods.mintNFT(addr2, tokenURI).send({ from: addr2, value: mintPrice, gas: 6000000 });
        // If the minting does not fail, force the test to fail
        expect.fail("The transaction should have failed but did not.");
      } catch (error) {
        expect(error.message).to.include("revert URI is already owned.");
      }
    });
  });
});
