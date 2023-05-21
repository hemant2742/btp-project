const { encryptData, decryptData } = require("../helpers/crypto");
exports.encryptData = async function (req, res) {
  const { data } = req.body;
  const encryptedData = [];
  if (data && Array.isArray(data) && data.length) {
    data.forEach((details) => {
      const jsonString = JSON.stringify(details);
      const encryptedString = encryptData(jsonString);
      encryptedData.push({
        name: details["name"],
        rollNumber: details["roll number"],
        encryptedString,
      });
    });
    res.json({
      error: false,
      encryptedData,
      message: "Data is successfully encrypted! QR will generate in a moment.",
    });
  } else {
    res.json({
      error: true,
      message: "The data is not in valid format",
    });
  }
};

exports.decryptData = async function (req, res) {
  const { data } = req.body;
  const decryptedData = JSON.parse(decryptData(data));
  const keys = Object.keys(decryptedData);
  const subjectData = {};
  const excludedFields = ['name', 'roll number', 'father name', 'branch', 'session', 'year']
  for (const key of keys) {
    if (!excludedFields.includes(key) ) {
      subjectData[key] = decryptedData[key];
    }
  }
  res.json({
    error: false,
    decryptedData: JSON.stringify(decryptedData),
    subjectData: JSON.stringify(subjectData),
    message: "Data is successfully decrypted!",
  });
};
