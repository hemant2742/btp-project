const { encryptData, decryptData } = require("../helpers/crypto");

exports.encryptData = async function (req, res) {
  const { data } = req.body;
  const encryptedData = encryptData(data);
  res.json({
    encryptedData,
    message: "Data is successfully encrypted! QR will generate in a moment.",
  });
  console.log(res);
};

exports.decryptData = async function (req, res) {
  const { data } = req.body;
  const decryptedData = decryptData(data);
  res.json({
    decryptedData,
    message: "Data is successfully decrypted!",
  });
};
