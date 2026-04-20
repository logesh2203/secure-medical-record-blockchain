# 🏥 Secure Medical Record System using Blockchain

A full-stack decentralized healthcare system that enables secure storage and controlled access of patient medical records using Blockchain technology.

---

## 🚀 Project Overview

This system ensures:

- 🔐 Secure file storage (Encrypted + IPFS + Local)
- 🧑‍⚕️ Hospital-based access control
- 👤 Patient-controlled permissions
- ⛓ Blockchain-based authorization (Ethereum / Ganache)
- 📂 Decentralized & tamper-proof records

---

## 🧠 Key Features

- Patient uploads encrypted medical records
- Files stored locally + optionally on IPFS
- Access granted via smart contract
- Doctors can view files only if access is approved
- Role-based authentication (JWT)

---

## 🏗 Tech Stack

### Frontend
- React.js
- Axios
- MetaMask Integration

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Blockchain
- Solidity
- Truffle
- Ganache
- Web3.js

### Storage
- IPFS (optional)
- Local encrypted storage

---

## 🔐 Access Control Logic

| Role     | Permissions |
|----------|------------|
| Patient  | Upload + Grant/Revoke |
| Doctor   | View (if approved) |

✔ Only approved hospital can access patient files  
❌ Unauthorized hospitals are denied  

---

## ⚙️ Installation Guide

### 1️⃣ Clone repository

```bash
git clone https://github.com/logesh2203/secure-medical-record-blockchain.git
cd secure-medical-record-blockchain

#2️⃣ Backend setup
cd backend
npm install
npm run dev

#3️⃣ Frontend setup
cd frontend
npm install
npm start

#4️⃣ Blockchain setup
Start Ganache, then:
truffle migrate --reset

#5️⃣ IPFS (Optional)
ipfs daemon

#🌐 Environment Variables
Create .env inside backend:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/medical
JWT_SECRET=your_secret_key
GANACHE_RPC_URL=http://127.0.0.1:7545
MEDICAL_RECORD_CONTRACT_ADDRESS=your_contract_address
FILE_ENCRYPTION_KEY=your_secret_key

#👥 Team Members
LOGESH K
KAMALESH S
MUHAMMED YASIN M

#🔒 Security Highlights
AES Encryption for files
JWT Authentication
Blockchain-based access verification
Hospital-level permission control

##📌 Future Improvements
Cloud storage (AWS / Firebase)
Multi-hospital network
AI-based diagnosis integration
Mobile application