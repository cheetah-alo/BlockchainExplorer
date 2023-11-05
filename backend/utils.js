function serializeBigInt(key, value) {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
}

module.exports = { serializeBigInt };
