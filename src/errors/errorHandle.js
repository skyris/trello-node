const NOT_FOUND_ERROR = require('./notFoundError');
const BAD_REQUEST_ERROR = require('./badRequestError');
/**
 * Error handle middleware
 * @param {Error} err 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise}
 */
const errorHandle = async (err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof NOT_FOUND_ERROR ||
      err instanceof BAD_REQUEST_ERROR) {
    res.status(err.status).send(err.message);
  } else if (err) {
    res.status(500).send('Some error happened!');
  }
  next();
};

module.exports = errorHandle;
