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
      url: "HTTP://127.0.0.1:8546",
      accounts: ["0x3a2c6ec51789293325673a6824fb59f2d00d7d2a66970980629ffd6f3caff631"]
    }
  },
};
