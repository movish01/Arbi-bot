const { expect } = require("chai");
const { ethers } = require("hardhat");

const WBTC_WHALE = "0x56178a0d5f301baf6cf3e1cd53d9863437345bf9";
const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const WBTC = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
const AMOUNT_IN = "1000000000000000000";
const AMOUNT_OUT_MIN = 0;

let testSushiswap;

const ABI = [
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "usr", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

describe("Swap:  ", async function () {
  it("Should deploy", async function () {
    const TestSushiswap = await ethers.getContractFactory("TestSushiswap");
    testSushiswap = await TestSushiswap.deploy();
    await testSushiswap.deployed();

    console.log("Deployed at", testSushiswap.address);
  });
  it("Should swap", async function () {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [WBTC_WHALE],
    });

    await hre.network.provider.send("hardhat_setBalance", [
      WBTC_WHALE,
      ethers.utils.parseEther("10.0").toHexString(),
    ]);

    const wbtc_signer = await ethers.getSigner(WBTC_WHALE);

    const token_wbtc = new ethers.Contract(WBTC, ABI);

    const tx = await token_wbtc
      .connect(wbtc_signer)
      .approve(testSushiswap.address, AMOUNT_IN);

    await testSushiswap
      .connect(wbtc_signer)
      .swap(WBTC, DAI, AMOUNT_IN, AMOUNT_OUT_MIN, WBTC_WHALE);
  });
});