const BAD_REQUEST_ERROR = require('../errors/badRequestError');

const validate = async (schema, body) => {
  try {
      await schema.validateAsync(body);
  } catch (err) {
    throw new BAD_REQUEST_ERROR('Bad request');
  }
}

module.exports = validate;
