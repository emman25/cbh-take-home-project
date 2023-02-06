const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
    
  it("should return '0' if there is no event provided.", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  test("hashes partitionKey if it's not a string", () => {
    const event = { partitionKey: 12345 };
    const result = deterministicPartitionKey(event);
    expect(result).toMatch(/^[a-f0-9]+$/);
  });
    
  it("should return the partition key if present in the event", () => {
    const event = { partitionKey: "the_partition_data" };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("the_partition_data");
  });
    
  it("should produce a hash of the string if the partition key's length is more than 256 characters.", () => {
    const event = { partitionKey: "a".repeat(300) };
    const trivialKey = deterministicPartitionKey(event);
    const expected = crypto.createHash("sha3-512").update(event.partitionKey).digest("hex");
    expect(trivialKey).toBe(expected);
  });
    
  test("hashes non-string data in event object if partitionKey is not present", () => {
    const event = { data: { test: "data" } };
    const result = deterministicPartitionKey(event);
    expect(result).toMatch(/^[a-f0-9]+$/);
  });
  
  
  test("hashes partitionKey if greater than 256 characters", () => {
    const longPartitionKey = "a".repeat(257);
    const event = { partitionKey: longPartitionKey };
    const result = deterministicPartitionKey(event);
    expect(result).toMatch(/^[a-f0-9]+$/);
  });

});
