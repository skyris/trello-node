const uuid = require('uuid');
const Column = require('../columns/column.model');

class Board {
  constructor({
    id = uuid.v4(),
    title = 'Board Title',
    columns = []
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  addColumn(column) {
    this.column.push(column);
  }

  static toResponse(board) {
    const {id, title, columns} = board;
    const jsonColumns = columns.map(column => column.toResponse());
    return {id, title, columns: jsonColumns};
  }

  static fromRequest(body) {
    const {columns = []} = body;
    const board = new Board({
      ...body,
      columns: columns.map(Column.fromRequest)
    });
    return board;
  }

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
