const uuid = require('uuid');
/**
 * @typedef {Object} columnData
 * @property {string} title - column title
 * @property {number} order - order of column
 */
/**
 * class to create a column object
 */
class Column {
  /**
   * @constructor
   * @param {columnData} columnData - column data
   */
  constructor({
    id = uuid.v4(),
    title = 'Column Title',
    order = 0
  } = {}) {
    /**
     * @property {string} id - column id
     */
    this.id = id;
    /**
     * @property {string} title - column title
     */
    this.title = title;
    /**
     * @property {number} order - column order
     */
    this.order = order;
  }

  /**
   * @property {Function} toResponse - column to response
   * @returns {Column}
   */
  toResponse() {
    const {id, title, order} = this;
    return {id, title, order};
  }

  /**
   * @static
   * @property {Function} fromRequest - create new column
   * @param {columnData} body - data from frontend
   * @returns {Column}
   */
  static fromRequest(body) {
    return new Column(body);
  }

  /**
   * @property {Function} merge - merge columns during board update
   * @param {columnData} body 
   * @returns {void}
   */
  merge(body) {
    const {title, order} = body;
    if (title !== undefined && this.title !== title) {
      this.title = title;
    }
    if (order !== undefined && this.order !== order) {
      this.order = order;
    }
  }
}

module.exports = Column;
