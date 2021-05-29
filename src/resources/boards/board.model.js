const uuid = require('uuid');
const Column = require('../columns/column.model');

/**
 * @typedef {Object} boardData
 * @property {string} title - board title
 * @property {Array<Column>} columns - columns of a board
 */

/**
 * class to create a board object
 */
class Board {
  /**
   * @constructor
   * @param {boardData} boardData - board data
   */
  constructor({
    id = uuid.v4(),
    title = 'Board Title',
    columns = []
  } = {}) {
    /**
     * @property {string} id - board id
     */
    this.id = id;
    /**
     * @property {string} title - board title
     */
    this.title = title;
    /**
     * @property {Array<Column>} columns - columns of a board
     */
    this.columns = columns;
  }

  /**
   * @property {Function} addColumn - column to response
   * @param {Column} column 
   * @returns {void}
   */
  addColumn(column) {
    this.column.push(column);
  }

  /**
   * @static
   * @property {Function} toResponse - clear board data to response
   * @param {Board} board
   * @returns {{id: string, title: string, columns: Array<Column>}}
   */
  static toResponse(board) {
    const {id, title, columns} = board;
    const jsonColumns = columns.map(column => column.toResponse());
    return {id, title, columns: jsonColumns};
  }

  /**
   * @static
   * @property {Function} fromRequest - create new board
   * @param {{title: string, columns: Array<Column>}} body 
   * @returns {Board}
   */
  static fromRequest(body) {
    const {columns = []} = body;
    const board = new Board({
      ...body,
      columns: columns.map(Column.fromRequest)
    });
    return board;
  }

  /**
   * @property {Function} update - update current board data
   * @param {{title: string, columns: Array<Column>}} body 
   * @returns {void}
   */
  update(body) {
    const {title, columns} = body;
    if (title !== undefined && this.title !== title) {
      this.title = title;
    }
    if (columns !== undefined && Array.isArray(columns)) {
      for (let i = 0; i < this.columns.length; i += 1) {
        columns
          .filter(col => col.id)
          .forEach(col => {
            if (col.id === this.columns[i].id) {
              this.columns[i].merge(col);
            }
          });
      }
    }
  }
}

module.exports = Board;
