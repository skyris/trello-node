const DB = require('../../utils/db');
const NOT_FOUND_ERROR = require('../../errors/notFoundError');

const TABLE_NAME = 'Users';

const readAll = async () => DB.readAll(TABLE_NAME);

const read = async id => {
  const user = await DB.read(TABLE_NAME, id);
  if (!user) {
    throw new NOT_FOUND_ERROR(`Couldn't find a user with id: ${id}`);
  }

  return user;
};

const remove = async id => {
  const user = await DB.remove(TABLE_NAME, id);
  if (!user) {
    throw new NOT_FOUND_ERROR(`Couldn't find a user with id: ${id}`);
  }
};

const create = async user => DB.create(TABLE_NAME, user);

const update = async (propsObject, userData) => {
  const element = await DB.update(TABLE_NAME, propsObject, userData);
  if (!element) {
    throw new NOT_FOUND_ERROR(
      `Couldn't find a user with id: ${propsObject.id}`
    );
  }

  return element;
};

module.exports = {readAll, read, remove, create, update};
