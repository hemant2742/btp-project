const { privateKeys } = require("../constants");
const crypto = require("crypto");

const key = crypto
  .createHash('sha512')
  .update(privateKeys.encryptionKey)
  .digest('hex')
  .substring(0, 16)
const encryptionIV = crypto
  .createHash('sha512')
  .update(privateKeys.secretIV)
  .digest('hex')
  .substring(0, 16)



exports.encryptData =(data) => {
    const cipher = crypto.createCipheriv('aes-128-cbc', key, encryptionIV)
    return Buffer.from(
      cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64') 
}

exports.decryptData =  (data) => {
  const buff = Buffer.from(data, 'base64')
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, encryptionIV)
  return (
    decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
    decipher.final('utf8')
  )
}

