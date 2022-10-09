require("@nomiclabs/hardhat-waffle");
require('hardhat-deploy');
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");
require('hardhat-typechain');
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "mumbai",
  etherscan: {
    apiKey: {
      polygonMumbai: "HP9DXW3UK4TEHZD78G1H9WWHAIY83YMWR9"
    }
  },
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.gateway.pokt.network/v1/lb/e2e41cd96bb6f357b9fcedc2`,
      accounts: [`e07da01336815f96fb6aadc1c44c14b20b2997c5d58e8647da62de6822f5ca9a`],
    }
  }
};
