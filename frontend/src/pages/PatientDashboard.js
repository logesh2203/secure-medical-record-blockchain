import React, { useCallback, useEffect, useState } from "react";
import api from "../services/api";
import FileList from "../components/FileList";
import FileUploadForm from "../components/FileUploadForm";
import HospitalSelector from "../components/HospitalSelector";
import { useAuth } from "../context/AuthContext";
import { grantHospitalAccessTx, revokeHospitalAccessTx } from "../services/medicalRecordContract";

const PatientDashboard = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [hospitalAccess, setHospitalAccess] = useState([]);
  const [accessHospital, setAccessHospital] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const normalizeHospital = useCallback(
    (hospital) => String(hospital || "").trim().toUpperCase(),
    []
  );

  const fetchAccessStatus = useCallback(async () => {
    try {
      const res = await api.get("/api/files/my-files");
      setHospitalAccess(res.data.hospitalAccess || []);
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Failed to load patient data.";
      setMessage(typeof msg === "string" ? msg : "Failed to load patient data.");
    }
  }, []);

  const fetchFiles = useCallback(async () => {
    try {
      const res = await api.get("/api/files/my-files");
      setFiles(res.data.files || []);
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Failed to load patient data.";
      setMessage(typeof msg === "string" ? msg : "Failed to load patient data.");
    }
  }, []);

  useEffect(() => {
    fetchAccessStatus();
    fetchFiles();
  }, [fetchAccessStatus, fetchFiles]);

  useEffect(() => {
    const saved = localStorage.getItem("selectedHospital");
    if (saved) {
      setAccessHospital(saved);
    }
  }, []);

  useEffect(() => {
    setAccessHospital("");
  }, [user?.walletAddress]);

  const handleHospitalChange = (hospital) => {
    setAccessHospital(hospital);
    localStorage.setItem("selectedHospital", hospital);
  };

  const handleUploadSuccess = async () => {
    await fetchAccessStatus();
    await fetchFiles();
  };

  const handleGrant = async () => {
    if (!accessHospital) {
      setMessage("Select a hospital first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (!accounts || accounts.length === 0) {
        alert("Please connect MetaMask");
        setLoading(false);
        return;
      }

      if (accounts[0].toLowerCase() !== user.walletAddress.toLowerCase()) {
        alert("Switch MetaMask account to your registered wallet");
        setLoading(false);
        return;
      }

      const hospital = normalizeHospital(accessHospital);
      localStorage.setItem("selectedHospital", hospital);

      await grantHospitalAccessTx(hospital, user?.walletAddress);
      setMessage("Access granted on-chain. Confirm the transaction in MetaMask if prompted.");
      await fetchAccessStatus();
      await fetchFiles();

      setTimeout(() => {
        fetchAccessStatus();
      }, 1000);
    } catch (error) {
      setMessage(error.message || "Grant failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async () => {
    if (!accessHospital) {
      setMessage("Select a hospital first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (!accounts || accounts.length === 0) {
        alert("Please connect MetaMask");
        setLoading(false);
        return;
      }

      if (accounts[0].toLowerCase() !== user.walletAddress.toLowerCase()) {
        alert("Switch MetaMask account to your registered wallet");
        setLoading(false);
        return;
      }

      const hospital = normalizeHospital(accessHospital);
      localStorage.setItem("selectedHospital", hospital);

      await revokeHospitalAccessTx(hospital, user?.walletAddress);
      setMessage("Access revoked on-chain. Confirm the transaction in MetaMask if prompted.");
      await fetchAccessStatus();
      await fetchFiles();

      setTimeout(() => {
        fetchAccessStatus();
      }, 1000);
    } catch (error) {
      setMessage(error.message || "Revoke failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="card">
        <h2>Patient workspace</h2>
        <p className="muted">
          Signed in as <strong>{user?.name}</strong>
        </p>
        <p>Email: {user?.email || "Not set"}</p>
        <p className="mono small">Wallet: {user?.walletAddress || "Not set"}</p>
      </div>

      <div className="card">
        <FileUploadForm onUploaded={handleUploadSuccess} />
      </div>

      <div className="card form-grid">
        <h3 className="section-title">Hospital access (MetaMask)</h3>
        <p className="muted small">
          Grant or revoke on-chain access for your wallet. Approve transactions in MetaMask - the server only reads blockchain state afterward.
        </p>
        <HospitalSelector label="Hospital" value={accessHospital} onChange={handleHospitalChange} />
        <div className="inline-group">
          <button className="button" type="button" disabled={loading} onClick={handleGrant}>
            Grant access
          </button>
          <button className="button secondary" type="button" disabled={loading} onClick={handleRevoke}>
            Revoke access
          </button>
        </div>
        {message ? <p className={message.toLowerCase().includes("fail") ? "error-text" : "success-text"}>{message}</p> : null}
      </div>

      <div className="card">
        <h3 className="section-title">Hospital access status</h3>
        {!hospitalAccess.length ? (
          <p className="muted">No on-chain access data yet.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Hospital</th>
                  <th>Allowed</th>
                </tr>
              </thead>
              <tbody>
                {hospitalAccess.map((row) => (
                  <tr key={row.hospital}>
                    <td>{row.hospital}</td>
                    <td>{row.allowed ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <FileList files={files} title="My files" />
    </div>
  );
};

export default PatientDashboard;
