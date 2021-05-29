const DB = require('../../utils/db');
const NOT_FOUND_ERROR = require('../../errors/notFoundError');
/**
 * Table Name
 * @type {string}
 */
const TABLE_NAME = 'Users';
/**
 * @returns {Array<User>}
 */
const readAll = async () => DB.readAll(TABLE_NAME);
/**
 * @param {string} id - user id
 * @returns {User}
 * @throws {NOT_FOUND_ERROR} if there is no user with such id
 */
const read = async id => {
  const user = await DB.read(TABLE_NAME, id);
  if (!user) {
    throw new NOT_FOUND_ERROR(TABLE_NAME, {id});
  }

  return user;
};
/**
 * @param {string} id - user id
 * @returns {void}
 * @throws {NOT_FOUND_ERROR} if there is no user with such id
 */
const remove = async id => {
  const user = await DB.remove(TABLE_NAME, id);
  if (!user) {
    throw new NOT_FOUND_ERROR(TABLE_NAME, {id});
  }
};
/**
 * @param {User} user - user object
 * @returns {User}
 */
const create = async user => DB.create(TABLE_NAME, user);
/**
 * @param {Object} propsObject
 * @param {Object} userData
 * @returns {User}
 * @throws {NOT_FOUND_ERROR} if there is no user with such id
 */
const update = async (propsObject, userData) => {
  const element = await DB.update(TABLE_NAME, propsObject, userData);
  if (!element) {
    const {id} = propsObject;
    throw new NOT_FOUND_ERROR(TABLE_NAME, {id});
  }

  return element;
};

module.exports = {readAll, read, remove, create, update};
