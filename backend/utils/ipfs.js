const { create } = require("ipfs-http-client");

const IPFS_API_URL = process.env.IPFS_API_URL || "http://127.0.0.1:5001";
const ipfsClient = create({ url: IPFS_API_URL });

const uploadToIPFS = async (fileBuffer) => {
  const result = await ipfsClient.add({ content: fileBuffer, pin: true });
  return result.cid.toString();
};

module.exports = {
  uploadToIPFS,
};
