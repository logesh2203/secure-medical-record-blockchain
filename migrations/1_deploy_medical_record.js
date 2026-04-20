const MedicalRecord = artifacts.require("MedicalRecord");

module.exports = function (deployer) {
  deployer.deploy(MedicalRecord, {
    gas: 6000000, // ✅ lower than block limit
  });
};