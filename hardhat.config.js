require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.5.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      },
      chainId: 137,
    },
    // mainnet: {
    //   url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    //   accounts: [`0x${PRIVATE_KEY}`],
    // }
  },
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN,
  // },
  mocha: {
    timeout: 10000 * 1000
  }
};
