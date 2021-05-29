/**
 * Error: Not Found Error
 */
class NOT_FOUND_ERROR extends Error {
  /**
   * @constructor
   * @param {TableName} tableName - table name
   * @param {Object} obj - properties object
   */
  constructor(tableName, obj) {
    const key = Object.keys(obj);
    const value = Object.values(obj);
    const name = tableName.substring(0, tableName.length - 1).toLowerCase();
    super(`Couldn't find a ${name} with ${key}: ${value}`);
    this.status = 404;
  }
}

module.exports = NOT_FOUND_ERROR;
