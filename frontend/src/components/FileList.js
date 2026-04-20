import React, { useState } from "react";
import api from "../services/api";

const FileList = ({ files = [], title = "Files", patientWalletForDoctorDownload = "" }) => {
  const [loadingKey, setLoadingKey] = useState("");

  const downloadLocal = (file, idx) => {
  if (!file.filename) return;

  const token = localStorage.getItem("token");

  let url = `http://localhost:5000/api/files/download/${file.filename}?token=${token}`;

  // 🔥 ADD THIS (VERY IMPORTANT FOR DOCTOR)
  if (patientWalletForDoctorDownload) {
    url += `&patientWallet=${patientWalletForDoctorDownload}`;
  }

  window.open(url, "_blank");
};
  if (!files.length) {
    return (
      <div className="card">
        <h3>{title}</h3>
        <p className="muted">No files found.</p>
      </div>
    );
  }

  return (
    <div className="card table-wrap">
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>Filename</th>
            <th>CID</th>
            <th>IPFS</th>
            <th>Local</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, idx) => {
            const cid = file.cid || "";
            const localPath = file.downloadUrl || "";
            const key = `${file.filename}-${idx}`;

            return (
              <tr key={key}>
                <td className="mono">{file.filename}</td>
                <td className="mono">{cid || "—"}</td>
                <td>
                  {cid ? (
                    <a href={`https://ipfs.io/ipfs/${cid}`} target="_blank" rel="noreferrer">
                      Open
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td>
                  {localPath ? (
                    <button
                      className="button secondary"
                      type="button"
                      onClick={() => downloadLocal(file, idx)}
                      disabled={loadingKey === key}
                    >
                      {loadingKey === key ? "Preparing..." : "Download"}
                    </button>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;
