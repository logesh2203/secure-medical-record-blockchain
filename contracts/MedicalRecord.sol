// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MedicalRecord {

    mapping(address => string[]) private patientFiles;

    // FIX: use bytes32 instead of string
    mapping(address => mapping(bytes32 => bool)) private hospitalAccess;

    function uploadFile(string memory cid) external {
        patientFiles[msg.sender].push(cid);
    }

    function grantAccess(string memory hospital) external {
        bytes32 hospitalKey = keccak256(abi.encodePacked(hospital));
        hospitalAccess[msg.sender][hospitalKey] = true;
    }

    function revokeAccess(string memory hospital) external {
        bytes32 hospitalKey = keccak256(abi.encodePacked(hospital));
        hospitalAccess[msg.sender][hospitalKey] = false;
    }

    function getFiles(address patient) external view returns (string[] memory) {
        return patientFiles[patient];
    }

    function checkAccess(address patient, string memory hospital) external view returns (bool) {
        bytes32 hospitalKey = keccak256(abi.encodePacked(hospital));
        return hospitalAccess[patient][hospitalKey];
    }
}