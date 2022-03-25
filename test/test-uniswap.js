const { expect } = require("chai");
const { ethers } = require("hardhat");

const WBTC_WHALE = '0xbf72da2bd84c5170618fbe5914b0eca9638d5eb5'
const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
const AMOUNT_IN = '1000000000000000000';
const AMOUNT_OUT_MIN = 0;

let testUniswap

describe("Swap:  ", async function () {
  it("Should deploy", async function () {
    const TestUniswap = await ethers.getContractFactory("TestUniswap");
    testUniswap = await TestUniswap.deploy();
    await testUniswap.deployed();

    console.log(testUniswap.address)
  });
  it("Should swap", async function () {

    await hre.network.provider.send('hardhat_setBalance', [
      WBTC_WHALE,
      ethers.utils.parseEther('10.0').toHexString(),
    ])

    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [WBTC_WHALE],
    })
    const wbtc_signer = await ethers.getSigner(WBTC_WHALE)
    const token_wbtc = await ethers.getContractAt("IERC20", WBTC)
    await token_wbtc.connect(wbtc_signer).transfer(testUniswap.address, AMOUNT_IN);
    await testUniswap.connect(wbtc_signer).swap(
      WBTC,
      DAI,
      AMOUNT_IN,
      AMOUNT_OUT_MIN,
      WBTC_WHALE
    )

  });
});
