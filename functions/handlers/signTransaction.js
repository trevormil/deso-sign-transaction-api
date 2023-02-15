const EC = require("elliptic").ec;
const sha256 = require("sha256");

const { createDecipher } = require("crypto");

const uvarint64ToBuf = (uint) => {
  const result = [];

  while (uint >= 0x80) {
    result.push((uint & 0xff) | 0x80);
    uint >>>= 7;
  }

  result.push(uint | 0);

  return new Buffer(result);
};

function seedHexToPrivateKey(seedHex) {
  const ec = new EC("secp256k1");
  return ec.keyFromPrivate(seedHex);
}

exports.signTransaction = (seedHex, transactionHex) => {
  const privateKey = seedHexToPrivateKey(seedHex);

  const transactionBytes = new Buffer(transactionHex, "hex");
  const transactionHash = new Buffer(sha256.x2(transactionBytes), "hex");
  const signature = privateKey.sign(transactionHash, { canonical: true });
  const signatureBytes = new Buffer(signature.toDER());
  const signatureLength = uvarint64ToBuf(signatureBytes.length);

  const signedTransactionBytes = Buffer.concat([
    // This slice is bad. We need to remove the existing signature length field prior to appending the new one.
    // Once we have frontend transaction construction we won't need to do this.
    transactionBytes.slice(0, -1),
    signatureLength,
    signatureBytes,
  ]);

  return signedTransactionBytes.toString("hex");
};
