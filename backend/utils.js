/**
 * Serializes a JavaScript object, converting BigInt values to strings.
 * @param {string} key - The key of the object property.
 * @param {*} value - The value of the object property.
 * @returns {*} - The serialized value, with BigInt values converted to strings.
 */
function serializeBigInt(key, value) {
  if (typeof value === "bigint") {
    // Convert BigInt values to strings to ensure compatibility with JSON
    return value.toString();
  }
  return value; // Return the value unchanged for non-BigInt properties
}

module.exports = { serializeBigInt };
