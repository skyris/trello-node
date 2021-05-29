const uuid = require('uuid');
/**
 * @typedef {Object} taskData
 * @property {string} id - task description
 * @property {number} order - task order
 * @property {string} description - task description
 * @property {string} userId - user id
 * @property {string} boardId - board id
 * @property {string} columnId - column id
 */
/**
 * class to create a task object
 */
class Task {
  /**
   * @constructor
   * @param {taskData} taskData - task data
   */
  constructor({
    id = uuid.v4(),
    title = 'Board Title',
    order = 0,
    description = 'Description',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    /**
     * @property {string} id - task id
     */
    this.id = id;
    /**
     * @property {string} title - task title
     */
    this.title = title;
    /**
     * @property {number} order - task order
     */
    this.order = order;
    /**
     * @property {string} description - task description
     */
    this.description = description;
    /**
     * @property {string} userId - user id
     */
    this.userId = userId;
    /**
     * @property {string} boardId - board id
     */
    this.boardId = boardId;
    /**
     * @property {string} columnId - column id
     */
    this.columnId = columnId;
  }

  /**
   * @static
   * @property {Function} toResponse - task to response
   * @returns {Task}
   */
  static toResponse(task) {
    const {id, title, order, description, userId, boardId, columnId} = task;
    return {id, title, order, description, userId, boardId, columnId};
  }

  /**
   * @static
   * @property {Function} fromRequest - create new task
   * @param {taskData} body 
   * @returns {Task}
   */
  static fromRequest(body) {
    return new Task(body);
  }

  /**
   * @property {Function} update - update current board data
   * @param {{title: string, columns: Array<Column>}} body 
   * @returns {void}
   */
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
