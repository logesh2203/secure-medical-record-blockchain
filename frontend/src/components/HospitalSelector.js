import React, { useId } from "react";
import { HOSPITALS } from "../constants";

const HospitalSelector = ({ value, onChange, label = "Hospital", required = false }) => {
  const id = useId();

  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <select id={id} name="hospitalName" value={value} onChange={(e) => onChange(e.target.value)} required={required}>
        <option value="">Select hospital</option>
        {HOSPITALS.map((hospital) => (
          <option key={hospital} value={hospital}>
            {hospital}
          </option>
        ))}
      </select>
    </label>
  );
};

export default HospitalSelector;
