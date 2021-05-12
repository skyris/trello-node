class NOT_FOUND_ERROR extends Error {
  constructor(args) {
    super(args);
    this.status = 404;
  }
}

module.exports = NOT_FOUND_ERROR;
