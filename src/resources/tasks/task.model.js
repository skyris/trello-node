const uuid = require('uuid');

class Task {
  constructor({
    id = uuid.v4(),
    title = 'Board Title',
    order = 0,
    description = 'Description',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const {id, title, order, description, userId, boardId, columnId} = task;
    return {id, title, order, description, userId, boardId, columnId};
  }

  static fromRequest(body) {
    return new Task(body);
  }

  update(body) {
    const {title, order, description, userId, boardId, columnId} = body;
    if (title !== undefined && this.title !== title) {
      this.title = title;
    }
    if (order !== undefined && this.order !== order) {
      this.order = order;
    }
    if (description !== undefined && this.description !== description) {
      this.description = description;
    }
    if (userId !== undefined && this.userId !== userId) {
      this.userId = userId;
    }
    if (boardId !== undefined && this.boardId !== boardId) {
      this.boardId = boardId;
    }
    if (columnId !== undefined && this.columnId !== columnId) {
      this.columnId = columnId;
    }
  }
}

module.exports = Task;
