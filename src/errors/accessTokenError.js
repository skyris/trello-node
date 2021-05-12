class ACCESS_TOKEN_IS_MISSING_OR_INVALID extends Error {
  constructor(args) {
    super(args);
    this.status = 401;
  }
}

module.exports =  ACCESS_TOKEN_IS_MISSING_OR_INVALID;
