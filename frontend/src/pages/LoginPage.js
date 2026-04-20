import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import MetaMaskBanner from "../components/MetaMaskBanner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/api/auth/login", { email, password });
      login({ token: res.data.token, user: res.data.user });
      navigate("/dashboard");
    } catch (error) {
      const data = error.response?.data;
      const errMsg = data?.message || data?.error || error.message || "Login failed.";
      setMessage(typeof errMsg === "string" ? errMsg : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="auth-stack">
        <MetaMaskBanner />
        <form className="card auth-card form-grid" onSubmit={handleSubmit}>
          <div>
            <h2>Sign in</h2>
            <p className="muted">Use the email and password you registered with.</p>
          </div>

          <label className="field">
            <span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </label>

          <label className="field">
            <span>Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
          </label>

          <button className="button" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Login"}
          </button>

          {message ? <p className="error-text">{message}</p> : null}

          <p className="muted">
            No account? <Link to="/signup">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
