const { signTransaction } = require("./signTransaction");
const { decryptSeedHex } = require("./decryptSeedHex");

exports.signHex = async (req, res) => {
  //Assign names to request body variables
  let transactionHex = req.body.transactionHex;
  let encryptedSeedHex = req.body.encryptedSeedHex;
  let hostEncryptionKey = req.body.hostEncryptionKey;

  //Decrypt seed hex and use decrypted seed hex to sign transaction
  const seedHex = decryptSeedHex(encryptedSeedHex, hostEncryptionKey);
  let signedHex = signTransaction(seedHex, transactionHex);

  //Return JSON object with signedHex
  return res.status(200).json({
    signedHex,
  });
};
