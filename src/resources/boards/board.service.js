const boardsRepo = require('./board.memory.repository');
/**
 * Get all boards
 * @returns {Array<Board>}
 */
const readAll = () => boardsRepo.readAll();
/**
 * Get board by id
 * @param {string} id - board id
 * @returns {Board}
 */
const read = id => boardsRepo.read(id);
/**
 * Remove board by id
 * @param {string} id - board id
 * @returns {void}
 */
const remove = id => boardsRepo.remove(id);
/**
 * Create new board
 * @param {Board} board - board object
 * @returns {Board}
 */
const create = board => boardsRepo.create(board);
/**
 * Update board data
 * @param {Object} propsObject - board properties
 * @param {object} boardData - board data for updating
 * @returns {Board}
 */
const update = (propsObject, boardData) => boardsRepo.update(propsObject, boardData);

module.exports = {readAll, read, remove, create, update};
