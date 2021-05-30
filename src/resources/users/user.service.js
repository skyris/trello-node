const usersRepo = require('./user.memory.repository');
/**
 * Get all users
 * @returns {Array<User>}
 */
const readAll = () => usersRepo.readAll();
/**
 * Get user by id
 * @param {string} id - user id
 * @returns {User}
 */
const read = id => usersRepo.read(id);
/**
 * Remove user by id
 * @param {string} id - user id
 * @returns {void}
 */
const remove = id => usersRepo.remove(id);
/**
 * Create new user
 * @param {User} user 
 * @returns {User}
 */
const create = user => usersRepo.create(user);
/**
 * Update user data
 * @param {object} propsObject - user properties
 * @param {object} userData - user data for updating
 * @returns {User}
 */
const update = (propsObject, userData) => usersRepo.update(propsObject, userData);

module.exports = {readAll, read, remove, create, update};
