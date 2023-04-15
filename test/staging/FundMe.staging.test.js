const { getNamedAccounts, ethers, network } = require("hardhat");
const { assert, expect } = require("chai");
const {
  developmentChains,
  networkConfig,
} = require("../../helper-hardhat-config");
developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", async function () {
      let fundme;
      let deployer;
      const sendValue = ethers.utils.parseEther("1");
      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        // we dont deploy the contract, we suppose they are already deployed
        // we dont deploy mock, we suppose we are in a test net
        fundme = await ethers.getContract("FundMe", deployer);
      });
      it("allows people to fund and withdraw", async function () {
        await fundme.fund({ value: sendValue });
        await fundme.withdraw();
        const endingBalance = await ethers.provider.getBalance(fundme.address);
        assert.equal(endingBalance.toString(), "0");
      });
    });
