/**
 * Error: Bad Request Error
 */
class BAD_REQUEST_ERROR extends Error {
  /**
   * @constructor
   * @param {Array} args 
   */
  constructor(args) {
    super(args);
    this.status = 400;
  }
}

module.exports = BAD_REQUEST_ERROR;
