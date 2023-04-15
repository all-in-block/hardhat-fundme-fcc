// const { network } = require("hardhat");
// const {
//   developmentChains,
//   DECIMALS,
//   INITIAL_PRICE,
// } = require("../helper-hardhat-config");
// // const DECIMALS = "8";
// // const INITIAL_PRICE = "200000000000"; // 2000
// module.exports = async ({ getNamedAccounts, deployments }) => {
//   const { deploy, log } = deployments;
//   const { deployer } = await getNamedAccounts();
//   console.log(deployer);
//   // If we are on a local development network, we need to deploy mocks!
//   if (developmentChains.includes(network.name)) {
//     log("Local network detected! Deploying mocks...");
//     await deploy("MockV3Aggregator", {
//       contract: "MockV3Aggregator",
//       from: deployer,
//       log: true,
//       args: [DECIMALS, INITIAL_PRICE],
//     });
//     log("Mocks Deployed!");
//     log("------------------------------------------------");
//   }
// };
// module.exports.tags = ["all", "mocks"]; // npx hardhat deploy --tags mocks : to deploy just scripts with mocks tag

//----------------

const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const DECIMALS = "8";
const INITIAL_PRICE = "200000000000"; // 2000
module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, log } = await deployments;
  const { deployer } = await getNamedAccounts();
  // If we are on a local development network, we need to deploy mocks!
  // const chainId = network.config.chainId;
  if (developmentChains.includes(network.name)) {
    log("Local network detected! Deploying mocks...");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_PRICE],
    });
    log("Mocks Deployed!");
    log("------------------------------------------------");
    log(
      "You are deploying to a local network, you'll need a local network running to interact"
    );
    log(
      "Please run `npx hardhat console` to interact with the deployed smart contracts!"
    );
    log("------------------------------------------------");
  }
};
module.exports.tags = ["all", "mocks"];
