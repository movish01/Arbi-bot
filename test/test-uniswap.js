// const BN = require("bn.js");
// const { sendEther } = require("./util");
// const Web3 = require('web3');
// const { DAI, WBTC, WBTC_WHALE } = require("./config");

// const IERC20 = artifacts.require("IERC20");
// const TestUniswap = artifacts.require("TestUniswap");

// contract("TestUniswap", (accounts) => {
//   const WETH_WHALE = 0xee2826453A4Fd5AfeB7ceffeEF3fFA2320081268
//   const DAI_WHALE = 0xF977814e90dA44bFA03b6295A0616a897441aceC
//   const USDC_WHALE = 0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE
//   const USDT_WHALE = 0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE
//   const WBTC_WHALE = 0xbf72da2bd84c5170618fbe5914b0eca9638d5eb5

//   const WHALE = WBTC_WHALE;
//   const AMOUNT_IN = '10000000000000000';
//   const AMOUNT_OUT_MIN = 0;
//   const TOKEN_IN = WBTC;
//   const TOKEN_OUT = DAI; 
//   const TO = accounts[0];

//   let testUniswap;
//   let tokenIn;
//   let tokenOut;
//   beforeEach(async () => {
//     tokenIn = await IERC20.at(TOKEN_IN);
//     tokenOut = await IERC20.at(TOKEN_OUT);
//     testUniswap = await TestUniswap.new();
//     console.log(testUniswap.address)

//     // make sure WHALE has enough ETH to send tx
//     console.log(1)
//     await sendEther(Web3, accounts[0], WHALE, 1);
//     console.log(1)
//     await tokenIn.approve(testUniswap.address, AMOUNT_IN);
//     console.log(1)
//   });

//     console.log("works  ..")
//   it("should pass", async () => {
//     await testUniswap.swap(
//       tokenIn.address,
//       tokenOut.address,
//       AMOUNT_IN,
//       AMOUNT_OUT_MIN,
//       WHALE,
//       {
//         from: WHALE,
//       }
//     );
//       console.log("it works")
//     console.log(`in ${AMOUNT_IN}`);
//     console.log(`out ${await tokenOut.balanceOf(TO)}`);
//   });
// });

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TestUniswap", function () {
  it("Should Run", async function () {
    const TestUniswap = await ethers.getContractFactory("TestUniswap");
    const testUniswap = await TestUniswap.deploy();
    await testUniswap.deployed();

    
  });
});
