import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import HospitalSelector from "../components/HospitalSelector";
import MetaMaskBanner from "../components/MetaMaskBanner";
import {
  getChainId,
  isGanacheChainId,
  isMetaMaskInstalled,
  onChainChanged,
  requestAccountsOnly,
} from "../utils/metamask";

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    walletAddress: "",
    hospitalName: "",
  });
  const [walletConnected, setWalletConnected] = useState(false);
  const [chainOk, setChainOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const syncChain = async () => {
    if (!isMetaMaskInstalled()) {
      setChainOk(false);
      return;
    }
    try {
      const cid = await getChainId();
      setChainOk(isGanacheChainId(cid));
    } catch {
      setChainOk(false);
    }
  };

  useEffect(() => {
    syncChain();
    const off = onChainChanged(() => {
      syncChain();
    });
    return off;
  }, []);

  const handleConnectWallet = async () => {
    setMessage("");
    try {
      if (!isMetaMaskInstalled()) {
        setMessage("Connect MetaMask first — install the MetaMask extension.");
        setWalletConnected(false);
        setForm((prev) => ({ ...prev, walletAddress: "" }));
        return;
      }
      const address = await requestAccountsOnly();
      updateField("walletAddress", address);
      setWalletConnected(true);
      const cid = await getChainId();
      const ok = isGanacheChainId(cid);
      setChainOk(ok);
      if (!ok) {
        setMessage("Switch MetaMask to Ganache (chain ID 1337 or 5777) to sign up.");
      }
    } catch (error) {
      setWalletConnected(false);
      setForm((prev) => ({ ...prev, walletAddress: "" }));
      setMessage(error.message || "Connect MetaMask first.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!walletConnected || !form.walletAddress) {
      setMessage("Connect MetaMask first.");
      return;
    }

    if (!chainOk) {
      setMessage("Switch MetaMask to Ganache (chain ID 1337 or 5777) before signing up.");
      return;
    }

    if (!form.name || !form.email || !form.password || !form.role) {
      setMessage("Please complete all required fields.");
      return;
    }

    if (form.role === "doctor" && !form.hospitalName) {
      setMessage("Doctors must select a hospital.");
      return;
    }

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
      walletAddress: form.walletAddress,
      hospitalName: form.role === "doctor" ? form.hospitalName : "",
    };

    try {
      setLoading(true);
      await api.post("/api/auth/signup", payload);
      navigate("/login");
    } catch (error) {
      const errMsg = error.response?.data?.message || error.response?.data?.error || error.message || "Signup failed.";
      setMessage(typeof errMsg === "string" ? errMsg : "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  const signupDisabled = loading || !walletConnected || !form.walletAddress || !chainOk;

  return (
    <div className="page-center">
      <div className="auth-stack">
        <MetaMaskBanner />
        <form className="card auth-card form-grid" onSubmit={handleSubmit}>
          <div>
            <h2>Create account</h2>
            <p className="muted">Wallet address comes only from MetaMask (no manual entry).</p>
          </div>

          <label className="field">
            <span>Full name</span>
            <input value={form.name} onChange={(e) => updateField("name", e.target.value)} required autoComplete="name" />
          </label>

          <label className="field">
            <span>Email</span>
            <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} required autoComplete="email" />
          </label>

          <label className="field">
            <span>Password</span>
            <input type="password" value={form.password} onChange={(e) => updateField("password", e.target.value)} required autoComplete="new-password" />
          </label>

          <label className="field">
            <span>Role</span>
            <select
              value={form.role}
              onChange={(e) => {
                const nextRole = e.target.value;
                updateField("role", nextRole);
                if (nextRole === "patient") {
                  updateField("hospitalName", "");
                }
              }}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </label>

          <div className="field">
            <span>Wallet (MetaMask only)</span>
            {form.walletAddress ? (
              <div className="field-readonly mono">{form.walletAddress}</div>
            ) : (
              <p className="muted small">Not connected</p>
            )}
          </div>

          <div className="inline-group">
            <button className="button secondary" type="button" onClick={handleConnectWallet}>
              Connect wallet
            </button>
          </div>

          {form.role === "doctor" ? (
            <HospitalSelector label="Hospital (doctor)" value={form.hospitalName} onChange={(v) => updateField("hospitalName", v)} required />
          ) : null}

          <button className="button" type="submit" disabled={signupDisabled}>
            {loading ? "Creating account…" : "Sign up"}
          </button>

          {message ? <p className="error-text">{message}</p> : null}

          <p className="muted">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
