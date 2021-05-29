const uuid = require('uuid');
/**
 * @typedef {Object} userData
 * @property {string} name - user name
 * @property {string} login - user login
 * @property {string} password - user password
 */
/**
 * class to create a user object
 */
class User {
  /**
   * @constructor
   * @param {userData} userData - user data
   */
  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    /**
     * @property {string} id - user id
     */
    this.id = id;
    /**
     * @property {string} name - user name
     */
    this.name = name;
    /**
     * @property {string} login - user login
     */
    this.login = login;
    /**
     * @property {string} password - user password
     */
    this.password = password;
  }

  /**
   * @static
   * @property {Function} toResponse - clear user data to response
   * @param {User} user
   * @returns {{id: string, name: string, login: string}}
   */
  static toResponse(user) {
    const {id, name, login} = user;
    return {id, name, login};
  }

  /**
   * @static
   * @property {Function} fromRequest - create new user
   * @param {userData} body - user data from frontend
   * @returns {User}
   */
  static fromRequest(body) {
    const {name, login, password} = body;
    return new User({name, login, password});
  }

  /**
   * @property {Function} update - update current user data
   * @param {userData} body - object from frontend
   * @returns {void}
   */
  update(body) {
    const {name, login, password} = body;
    if (name !== undefined && this.name !== name) {
      this.name = name;
    }
    if (login !== undefined && this.login !== login) {
      this.login = login;
    }
    if (password !== undefined && this.password !== password) {
      this.password = password;
    }
  }
}

module.exports = User;
