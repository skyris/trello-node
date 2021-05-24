const uuid = require('uuid');

class Column {
  constructor({
    id = uuid.v4(),
    title = 'Column Title',
    order = 0
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  toResponse() {
    const {id, title, order} = this;
    return {id, title, order};
  }

  static fromRequest(body) {
    return new Column(body);
  }

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
