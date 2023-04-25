const mongoose = require('mongoose');

exports.connect = function () {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost/qr-scanner', {useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', (ex) => {
      console.error(ex);
      reject(ex);
    });
    db.once('open', function() {
      resolve();
    });
  });
};