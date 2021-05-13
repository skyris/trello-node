const uuid = require('uuid');

class User {
  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const {id, name, login} = user;
    return {id, name, login};
  }

  static fromRequest(body) {
    const {name, login, password} = body;
    return new User({name, login, password});
  }

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
