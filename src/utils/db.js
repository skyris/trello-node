const NOT_FOUND_ERROR = require('../errors/notFoundError');
const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const Column = require('../resources/columns/column.model');
/**
 * @typedef {Object} dataBase
 * @property {Array<User>} Users
 * @property {Array<Board>} Boards
 * @property {Array<Task>} Tasks
 * @property {Function} fixUsersStructure
 * @property {Function} fixBoardsStructure
 * @property {Function} fixTasksStructure
 */
/**
 * Handmade Data Base
 * @type {dataBase}
 */
const db = {
  Users: [],
  Boards: [],
  Tasks: [],
  fixUsersStructure: user => {
    if (user) {
      for (let i = 0; i < db.Tasks.length; i += 1) {
        if (db.Tasks[i] && db.Tasks[i].userId === user.id) {
          db.Tasks[i].userId = null;
        }
      }
    } 
  },
  fixBoardsStructure: board => {
    if (board) {
      for (let i = 0; i < db.Tasks.length; i += 1) {
        if (db.Tasks[i] && db.Tasks[i].boardId === board.id) {
          db.Tasks[i] = undefined;
        }
      }
    }
  },
  fixTasksStructure: task => {
    console.log('Task: ', task);
  }
};

// ------------------------------------------------------------------
// init DB with mock data
// ------------------------------------------------------------------
(() => {
  const users = [
    new User({name: 'Mr Smith', login: 'MrSmith', password: 'myPass'}),
    new User({name: 'John Dow', login: 'John', password: 'myPass07'}),
    new User({name: 'Jane Dow', login: 'Jane', password: 'myPass09'})
  ];
  const columns = [new Column(), new Column({order: 1})];
  const board = new Board({columns});
  const tasks = [
    new Task({
      boardId: board.id, userId: users[0].id, columnId: columns[0].id
    }),
    new Task({
      boardId: board.id, userId: users[1].id, columnId: columns[0].id
    })
  ];
  db.Users.push(...users);
  db.Boards.push(board);
  db.Tasks.push(...tasks);
})();
// ------------------------------------------------------------------
/**
 * @typedef {('Users'|'Boards'|'Tasks')} TableName 
 */
/**
 * @typedef {(Promise<User>|Promise<Board>|Promise<Task>)} PromiseElementFromDB
 */
/**
 * @typedef {(Array<User>|Array<Board>|Array<Task>)} ArrayOfDBElements
 */
/**
 * Get all elements from DB
 * @param {TableName} tableName 
 * @returns {ArrayOfDBElements}
 */
const readAll = tableName => db[tableName].filter(element => element);
/**
 * Get element by id from DB
 * @param {TableName} tableName 
 * @param {string} id 
 * @returns {(User|Board|Task)}
 * @throws {Error}
 */
const read = (tableName, id) => {
  const elements = db[tableName]
    .filter(el => el)
    .filter(el => el.id === id);

  if (elements.length > 1) {
    console.error(
      `The DB data is damaged. Table ${tableName}. Element ID: ${id}`
    );
    throw Error('The DB data is wrong!');
  }

  return elements[0];
};
/**
 * get element by properties from DB 
 * @param {TableName} tableName 
 * @param {Object} propsObject 
 * @returns {ArrayOfDBElements}
 * @throws {NOT_FOUND_ERROR}
 */
const filterByProperties = (tableName, propsObject) => {
  let elements = db[tableName].filter(el => el);
  const keys = Object.keys(propsObject);
  for (let i = 0; i < keys.length; i += 1) {
    elements = elements
      .filter(el => el[keys[i]] === propsObject[keys[i]]);
    if (!elements.length) {
      const obj = {[keys[i]]: propsObject[keys[i]]}
      throw new NOT_FOUND_ERROR(tableName, obj);
    }
  }

  return elements;
};
/**
 * Remove element by id from DB 
 * @param {TableName} tableName 
 * @param {Object} propsObject 
 * @returns {PromiseElementFromDB}
 */
const remove = async (tableName, id) => {
  const element = read(tableName, id);
  if (element) {
    db[`fix${tableName}Structure`](element);
    db[tableName] = db[tableName]
      .filter(el => el)
      .filter(el => el.id !== id);
  }

  return element;
};
/**
 * Save new element to DB
 * @param {TableName} tableName 
 * @param {(User|Board|Task)} element 
 * @returns {PromiseElementFromDB}
 */
const create = async (tableName, element) => {
  db[tableName].push(element);

  return read(tableName, element.id);
};
/**
 * Update data in DB
 * @param {TableName} tableName 
 * @param {Object} propsObject 
 * @param {Object} newData 
 * @returns {PromiseElementFromDB}
 */
const update = async (tableName, propsObject, newData) => {
  const oldElement = filterByProperties(tableName, propsObject)[0];
  if (oldElement) {
    oldElement.update(newData);
  }

  return read(tableName, propsObject.id);
};

module.exports = {
  readAll,
  read,
  remove,
  create,
  update,
  filterByProperties
};
