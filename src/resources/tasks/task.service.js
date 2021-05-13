const tasksRepo = require('./task.memory.repository');

const find = propsObject => tasksRepo.find(propsObject);

const findOne = propsObject => tasksRepo.findOne(propsObject);

const remove = propsObject => tasksRepo.remove(propsObject);

const create = task => tasksRepo.create(task);

const update = (propsObject, taskData) => tasksRepo.update(propsObject, taskData);

module.exports = {find, findOne, remove, create, update};
