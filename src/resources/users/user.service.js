const usersRepo = require('./user.memory.repository');

const readAll = () => usersRepo.readAll();

const read = id => usersRepo.read(id);

const remove = id => usersRepo.remove(id);

const create = user => usersRepo.create(user);

const update = (propsObject, userData) => usersRepo.update(propsObject, userData);

module.exports = {readAll, read, remove, create, update};
