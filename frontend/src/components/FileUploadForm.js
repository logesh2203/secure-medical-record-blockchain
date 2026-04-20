import React, { useState } from "react";
import api from "../services/api";

/**
 * Upload only the file — no hospital. Backend stores under uploads/{patientId}/filename.
 * Do not set Content-Type manually (multipart boundary required).
 */
const FileUploadForm = ({ onUploaded }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Select a file.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/api/files/upload", formData);

      setMessage(response.data.message || "Uploaded successfully.");
      setFile(null);
      if (onUploaded) {
        onUploaded(response.data.file);
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.response?.data?.error || error.message || "Upload failed.";
      setMessage(typeof msg === "string" ? msg : "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <h3 className="section-title">Upload file</h3>
      <p className="muted small">Choose one file. It is encrypted, stored on disk, pushed to IPFS, and the CID is saved on-chain.</p>
      <label className="field">
        <span>File</span>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </label>
      <button className="button" type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {message ? (
        <p className={message.toLowerCase().includes("fail") ? "error-text" : "success-text"}>{message}</p>
      ) : null}
    </form>
  );
};

export default FileUploadForm;
