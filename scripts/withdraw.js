const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  const fundme = await ethers.getContract("FundMe", deployer);
  console.log("processing withdraw......");
  const transactionResponse = await fundme.withdraw();
  await transactionResponse.wait(1);
  const balance = await ethers.provider.getBalance(fundme.address);
  console.log(balance.toString());
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(0);
  });
