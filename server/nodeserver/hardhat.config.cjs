require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.6.0",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:8545", // Địa chỉ mặc định của Ganache
      accounts: ["0x65976f571ed62d2a499240a3fba3b06f918059baa4d78345bb79f55c97cf2b3b"] // Sử dụng private key của tài khoản Ganache
    },
    testnet_docker: {
      url: "HTTP://127.0.0.1:8545",
      accounts: ["0x24571e852315cdf65274fd25fb658b001b1be62972f931b989d6ded2a96998e2"]
    }
  },
};
