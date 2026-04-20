import artifact from "../abis/MedicalRecord.json";

export const MEDICAL_RECORD_ABI = artifact.abi;
export const MEDICAL_RECORD_CONTRACT_ADDRESS = process.env.REACT_APP_MEDICAL_RECORD_CONTRACT_ADDRESS || "";
