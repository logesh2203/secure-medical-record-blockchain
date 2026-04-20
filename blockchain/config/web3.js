const Web3 = require("web3");

const RPC_URL = process.env.GANACHE_RPC_URL || "http://127.0.0.1:7545";

const web3 = new Web3(RPC_URL);

module.exports = web3;
