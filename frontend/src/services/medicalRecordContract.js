import Web3 from "web3";
import { MEDICAL_RECORD_ABI, MEDICAL_RECORD_CONTRACT_ADDRESS } from "../config/contract";

const normalizeHospital = (value) =>
  String(value || "").trim().toUpperCase();

const assertMetaMask = () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed.");
  }
};

const assertContract = () => {
  if (!MEDICAL_RECORD_CONTRACT_ADDRESS) {
    throw new Error("Smart contract address is not configured (REACT_APP_MEDICAL_RECORD_CONTRACT_ADDRESS).");
  }
};

/**
 * Grant / revoke hospital access — transactions are signed in MetaMask (patient wallet only).
 */
export const grantHospitalAccessTx = async (hospitalName, expectedPatientWallet) => {
  assertMetaMask();
  assertContract();

  const web3 = new Web3(window.ethereum);
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  if (!accounts?.length) {
    throw new Error("Connect MetaMask first.");
  }
  const from = accounts[0];
  if (expectedPatientWallet && from.toLowerCase() !== String(expectedPatientWallet).toLowerCase()) {
    throw new Error("Switch MetaMask to the wallet address registered on your account.");
  }

  const contract = new web3.eth.Contract(MEDICAL_RECORD_ABI, MEDICAL_RECORD_CONTRACT_ADDRESS);
  const h = normalizeHospital(hospitalName);
  if (!h) {
    throw new Error("Select a hospital.");
  }

  await contract.methods.grantAccess(h).send({ from, gas: 300000 });
};

export const revokeHospitalAccessTx = async (hospitalName, expectedPatientWallet) => {
  assertMetaMask();
  assertContract();

  const web3 = new Web3(window.ethereum);
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  if (!accounts?.length) {
    throw new Error("Connect MetaMask first.");
  }
  const from = accounts[0];
  if (expectedPatientWallet && from.toLowerCase() !== String(expectedPatientWallet).toLowerCase()) {
    throw new Error("Switch MetaMask to the wallet address registered on your account.");
  }

  const contract = new web3.eth.Contract(MEDICAL_RECORD_ABI, MEDICAL_RECORD_CONTRACT_ADDRESS);
  const h = normalizeHospital(hospitalName);
  if (!h) {
    throw new Error("Select a hospital.");
  }

  await contract.methods.revokeAccess(h).send({ from, gas: 300000 });
};
