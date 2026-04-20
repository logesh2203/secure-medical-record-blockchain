require("dotenv").config({ path: "./backend/.env" });

module.exports = {
  contracts_directory: "./contracts",
  contracts_build_directory: "./build/contracts",
  migrations_directory: "./migrations",
  networks: {
   development: {
  host: process.env.GANACHE_HOST || "127.0.0.1",
  port: Number(process.env.GANACHE_PORT || 7545),
  network_id: "*",
  gas: 8000000,
  gasPrice: 20000000000
},
  },
  compilers: {
    solc: {
      version: "0.8.17",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
