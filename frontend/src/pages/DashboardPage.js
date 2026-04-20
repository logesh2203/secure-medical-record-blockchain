import React from "react";
import { useAuth } from "../context/AuthContext";
import DoctorDashboard from "./DoctorDashboard";
import PatientDashboard from "./PatientDashboard";

const DashboardPage = () => {
  const { user } = useAuth();

  if (user?.role === "doctor") {
    return <DoctorDashboard />;
  }

  return <PatientDashboard />;
};

export default DashboardPage;
