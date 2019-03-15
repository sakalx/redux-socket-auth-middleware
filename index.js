const crypto = require('crypto');
const through = require('through2');

module.exports = function ({password = 'password', decrypt = false} = {}) {
  return decrypt
    ? through.obj((vinylFile, encoding, callback) => {
      callback(null, encryptor(vinylFile, password, decrypt));
    })
    : through.obj((vinylFile, encoding, callback) => {
      callback(null, encryptor(vinylFile, password, decrypt));
    });
};

function encryptor(vinylFile, password, decrypt) {
  if (vinylFile._contents) {
    let encrypt = crypto.createCipher('aes-256-ctr', password);

    if (decrypt) {
      encrypt = crypto.createDecipher('aes-256-ctr', password);
    }

    vinylFile._contents = Buffer.concat(
      [encrypt.update(vinylFile._contents), encrypt.final()]
    );

    return vinylFile;
  }
  return vinylFile;
}