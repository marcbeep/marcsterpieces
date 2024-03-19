const Web3 = require('web3');

async function main() {
  // Initialize web3 with a provider from Hardhat
  const web3 = new Web3(network.provider);

  const accounts = await web3.eth.getAccounts();
  const deployer = accounts[0];
  console.log("Deploying contracts with the account:", deployer);

  // Get the compiled contract artifact
  const contractArtifact = require("../src/artifacts/contracts/Marcsterpiece.sol/Marcsterpiece.json");

  // Initialize contract with ABI
  const Marcsterpiece = new web3.eth.Contract(contractArtifact.abi);

  // Deploy contract
  const marcsterpiece = await Marcsterpiece.deploy({
    data: contractArtifact.bytecode,
  })
  .send({
    from: deployer,
    gas: 5000000 // Adjust gas limit as needed
  });

  console.log("Marcsterpiece deployed to:", marcsterpiece.options.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error("Failed to deploy contract:", error);
    process.exit(1);
  });
