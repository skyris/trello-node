const DB = require('../../utils/db');
const NOT_FOUND_ERROR = require('../../errors/notFoundError');

const TABLE_NAME = 'Tasks';

const find = async propsObject => {
  const tasks = await DB.filterByProperties(TABLE_NAME, propsObject);
  return tasks;
};

const findOne = async propsObject => {
  const tasks = await find(propsObject);
  return tasks[0];
};

const remove = async propsObject => {
  await DB.filterByProperties(TABLE_NAME, propsObject);
  await DB.remove(TABLE_NAME, propsObject.id);
};

const create = async (boardId, task) => DB.create(TABLE_NAME, boardId, task);

const update = async (propsObject, taskData) => {
  const element = await DB.update(TABLE_NAME, propsObject, taskData);
  if (!element) {
    const {id} = propsObject;
    throw new NOT_FOUND_ERROR(TABLE_NAME, {id});
  }

  return element;
};

module.exports = {find, findOne, remove, create, update};
