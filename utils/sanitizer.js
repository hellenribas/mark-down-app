const validator = require('validator');

const sanitize = (input) => {
  // Remove espaços em branco antes e depois e escape caracteres
  return validator.escape(validator.trim(input));
};

module.exports = { sanitize };
