const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const createHash = (data) => crypto.createHash("sha3-512").update(data).digest("hex");

const getEventPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  return event.partitionKey || createHash(JSON.stringify(event));
};

exports.deterministicPartitionKey = (event) => {
  let partitionKey = getEventPartitionKey(event);

  if (typeof partitionKey !== "string") {
    partitionKey = JSON.stringify(partitionKey);
  }

  if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    partitionKey = createHash(partitionKey);
  }

  return partitionKey;
};
