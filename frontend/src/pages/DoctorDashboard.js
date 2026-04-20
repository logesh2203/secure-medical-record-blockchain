import React, { useEffect, useState } from "react";
import api from "../services/api";
import FileList from "../components/FileList";
import { useAuth } from "../context/AuthContext";

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [patientWallet, setPatientWallet] = useState("");
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("Select a patient");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/api/doctor/patients");
        setPatients(res.data.patients || []);
      } catch (error) {
        const msg = error.response?.data?.message || error.message || "Could not load patients.";
        setMessage(typeof msg === "string" ? msg : "Could not load patients.");
        setPatients([]);
      } finally {
        setListLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setPatientWallet("");
      setFiles([]);
      setStatus("Select a patient");
      setMessage("");
      setAccessDenied(false);
      return;
    }

    const patient = patients.find((item) => item._id === selectedId);
    const wallet = patient?.walletAddress || "";
    setPatientWallet(wallet);

    if (!wallet) {
      setFiles([]);
      setStatus("This patient has no wallet on file");
      setMessage("");
      setAccessDenied(false);
      return;
    }

    setMessage("");
    setAccessDenied(false);

    (async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/doctor/files", {
          params: { patientWallet: wallet },
        });

        setFiles(res.data.files || []);
        setStatus(res.data.accessAllowed ? "Access granted" : "No access");
        setMessage("");
        setAccessDenied(false);
      } catch (error) {
        setFiles([]);

        if (error.response?.status === 403) {
          setStatus("Access denied");
          setMessage("Access denied for this hospital");
          setAccessDenied(true);
        } else {
          setStatus("Access denied");
          const msg = error.response?.data?.message || error.message || "Unable to load patient files.";
          setMessage(typeof msg === "string" ? msg : "Unable to load patient files.");
          setAccessDenied(false);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedId, patients]);

  return (
    <div className="dashboard">
      <div className="card">
        <h2>Doctor workspace</h2>
        <p className="muted">
          Signed in as <strong>{user?.name}</strong>
        </p>
        <p>Email: {user?.email || "Not set"}</p>
        <p>
          Hospital: <strong>{user?.hospitalName || "Not set"}</strong>
        </p>
        <p className="mono small">Wallet: {user?.walletAddress || "Not set"}</p>
      </div>

      <div className="card form-grid">
        <h3 className="section-title">Patient files</h3>
        <p className="muted small">Select a registered patient. Files appear only if on-chain access allows your hospital.</p>

        {listLoading ? (
          <p className="muted">Loading patients...</p>
        ) : (
          <label className="field">
            <span>Select patient</span>
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
              <option value="">- Choose patient -</option>
              {patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.name}
                  {patient.walletAddress ? ` (${patient.walletAddress.slice(0, 8)}...)` : " (no wallet)"}
                </option>
              ))}
            </select>
          </label>
        )}

        {!listLoading && selectedId && patientWallet ? <p className="mono small">Patient wallet: {patientWallet}</p> : null}

        <p className="result-block">
          Status: <strong>{loading ? "Loading..." : status}</strong>
        </p>
        {message ? <p className="error-text">{message}</p> : null}
      </div>

      {!accessDenied ? <FileList files={files} title="Patient files" patientWalletForDoctorDownload={patientWallet} /> : null}
    </div>
  );
};

export default DoctorDashboard;
