const { encryptData, decryptData } = require("../helpers/crypto");


exports.encryptData = async function (req,res) {
    const {data} = req.body;
    const encryptedData = encryptData(data);
    res.json({
        encryptedData,
    })
}

exports.decryptData = async function (req,res) {
    const {data} = req.body;
    const decryptedData = decryptData(data);
    res.json({
        decryptedData,
    })
}
