async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  try {
      const Marcsterpiece = await ethers.getContractFactory("Marcsterpiece");
      const marcsterpiece = await Marcsterpiece.deploy();

      console.log("Marcsterpiece address:", marcsterpiece.address);
  } catch (error) {
      console.error("Failed to deploy Marcsterpiece:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
