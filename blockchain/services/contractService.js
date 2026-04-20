const path = require("path");
const web3 = require("../config/web3");
const medicalRecordArtifact = require(path.join(__dirname, "..", "abis", "MedicalRecord.json"));
const { normalizeHospital } = require("../../backend/utils/hospitals");

const CONTRACT_ADDRESS = process.env.MEDICAL_RECORD_CONTRACT_ADDRESS || "";

if (!CONTRACT_ADDRESS) {
  // eslint-disable-next-line no-console
  console.warn("MEDICAL_RECORD_CONTRACT_ADDRESS is not set. Blockchain calls will fail until it is configured.");
}

const contract = new web3.eth.Contract(medicalRecordArtifact.abi, CONTRACT_ADDRESS);

const uploadFileOnChain = async (patientWalletAddress, cid) => {
  return contract.methods.uploadFile(cid).send({
    from: patientWalletAddress,
    gas: 300000,
  });
};

const grantAccessOnChain = async (patientWalletAddress, hospitalName) => {
  return contract.methods.grantAccess(normalizeHospital(hospitalName)).send({
    from: patientWalletAddress,
    gas: 300000,
  });
};

const revokeAccessOnChain = async (patientWalletAddress, hospitalName) => {
  return contract.methods.revokeAccess(normalizeHospital(hospitalName)).send({
    from: patientWalletAddress,
    gas: 300000,
  });
};

const getPatientFilesOnChain = async (patientWalletAddress) => {
  return contract.methods.getFiles(patientWalletAddress).call();
};

const checkHospitalAccessOnChain = async (patientWalletAddress, hospitalName) => {
  return contract.methods
    .checkAccess(patientWalletAddress, normalizeHospital(hospitalName))
    .call();
};

module.exports = {
  normalizeHospital,
  uploadFileOnChain,
  grantAccessOnChain,
  revokeAccessOnChain,
  getPatientFilesOnChain,
  checkHospitalAccessOnChain,
};
