const { encryptData, decryptData } = require("../helpers/crypto");
exports.encryptData = async function (req, res) {
  const { data } = req.body;
  const encryptedData = [];
  if(data && Array.isArray(data) && data.length)
  {
  data.forEach((details) => {
    const jsonString = JSON.stringify(details);
    const encryptedString = encryptData(jsonString);
    encryptedData.push({
        rollNumber:  details['roll number'],
        encryptedString});
  })
  res.json({
    error: false,
    encryptedData,
    message: "Data is successfully encrypted! QR will generate in a moment.",
  });
  }else{
    res.json({
        error: true,
        message: 'The data is not in valid format'
    });
  }
};

exports.decryptData = async function (req, res) {
  const { data } = req.body;
  const decryptedData = decryptData(data);
  res.json({
    error: false,
    decryptedData,
    message: "Data is successfully decrypted!",
  });
};
