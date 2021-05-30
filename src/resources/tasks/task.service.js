const tasksRepo = require('./task.memory.repository');
/**
 * Get all tasks
 * @param {Object} propsObject - task properties
 * @returns {Array<Task>}
 */
const find = propsObject => tasksRepo.find(propsObject);
/**
 * Get task by properties
 * @param {Object} propsObject - task properties
 * @returns {Task}
 */
const findOne = propsObject => tasksRepo.findOne(propsObject);
/**
 * Remove user by properties
 * @param {Object} propsObject - task properties
 * @returns {void}
 */
const remove = propsObject => tasksRepo.remove(propsObject);
/**
 * Create new task
 * @param {Task} task - task object
 * @returns {Task}
 */
const create = task => tasksRepo.create(task);
/**
 * Update task data
 * @param {Object} propsObject - task properties
 * @param {object} taskData 
 * @returns {Task}
 */
const update = (propsObject, taskData) => tasksRepo.update(propsObject, taskData);

module.exports = {find, findOne, remove, create, update};
