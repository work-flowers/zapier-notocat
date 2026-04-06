// Removes keys with empty string, undefined, or null values from an object.
// Zapier sends empty strings for unfilled optional fields, which the Notocat
// API rejects.
const clean = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== undefined && v !== null && v !== ''
    )
  );

module.exports = { clean };
