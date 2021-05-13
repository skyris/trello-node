const boardsRepo = require('./board.memory.repository');

const readAll = () => boardsRepo.readAll();

const read = id => boardsRepo.read(id);

const remove = id => boardsRepo.remove(id);

const create = board => boardsRepo.create(board);

const update = (propsObject, boardData) => boardsRepo.update(propsObject, boardData);

module.exports = {readAll, read, remove, create, update};
