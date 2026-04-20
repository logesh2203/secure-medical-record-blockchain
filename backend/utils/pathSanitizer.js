const sanitizePathSegment = (value) => {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "_");
};

module.exports = sanitizePathSegment;
