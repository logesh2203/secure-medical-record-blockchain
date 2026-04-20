const HOSPITALS = ["KMCH", "GEM", "PSG", "Kathir", "Ramakrishna"];

const normalizeHospital = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "_");

module.exports = {
  HOSPITALS,
  normalizeHospital,
};
