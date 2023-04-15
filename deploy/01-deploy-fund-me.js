const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  // what happens when we want to change chains
  //use mock when we want to use hardhat network or localhost
  // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  let ethUsdPriceFeedAddress;
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    log("deploying on a testnet");
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    log(ethUsdPriceFeedAddress);
  }
  log("----------------------------------------------------");
  log("Deploying FundMe and waiting for confirmations...");
  const args = [ethUsdPriceFeedAddress];
  const ETHERSCAN_API_KEY = "U1371BNIUSW4WR1MT5GAF93DMJ9GX4TD9Z";
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args,
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  log(`FundMe deployed at ${fundMe.address}`);
  if (!developmentChains.includes(network.name) && ETHERSCAN_API_KEY) {
    await verify(fundMe.address, args);
  }
};

module.exports.tags = ["all", "fundme"];
