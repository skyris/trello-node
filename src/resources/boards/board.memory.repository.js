const DB = require('../../utils/db');
const NOT_FOUND_ERROR = require('../../errors/notFoundError');

const TABLE_NAME = 'Boards';

const readAll = async () => DB.readAll(TABLE_NAME);

const read = async id => {
  const board = await DB.read(TABLE_NAME, id);
  if (!board) {
    throw new NOT_FOUND_ERROR(`Couldn't find a board with id: ${id}`);
  }

  return board;
};

const remove = async id => {
  if (!(await DB.remove(TABLE_NAME, id))) {
    throw new NOT_FOUND_ERROR(`Couldn't find a board with id: ${id}`);
  }
};

const create = async board => DB.create(TABLE_NAME, board);

const update = async (propsObject, userData) => {
  const element = await DB.update(TABLE_NAME, propsObject, userData);
  if (!element) {
    throw new NOT_FOUND_ERROR(
      `Couldn't find a board with id: ${propsObject.id}`
    );
  }

  return element;
};

module.exports = {readAll, read, remove, create, update};
