
const express = require('express');
const { encryptData, decryptData } = require('../controllers/crypto');
const { wrapAsync } = require('../utils');

const router = new express.Router();

router.post('/encrypt', wrapAsync(encryptData));
router.post('/decrypt', wrapAsync(decryptData));

module.exports = router;