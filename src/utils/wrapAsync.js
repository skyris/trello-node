/**
 * Checks if fn is classified as a Function object.
 * @param {Function} fn 
 * @returns {boolean}
 */
function isFunction(fn) {
  return (
    fn &&
    ({}.toString.call(fn) === '[object Function]' ||
      {}.toString.call(fn) === '[object AsyncFunction]')
  );
}
/**
 * Wrapper for handling async errors
 * @param {Function} fn 
 * @returns {Function}
 * @throws {Error}
 */
function wrapRoute(fn) {
  if (!isFunction(fn)) {
    throw new Error(`fn ${fn.name} should be a function`);
  }
  return (req, res, next) => {
    const result = fn(req, res, next); // result is Promise
    if (result && result.catch) {
      result.catch(next);
    }
  };
}
/**
 * The input can be a function or an array of functions
 * @param {Function|Array<Function>} obj - callback or array of callbacks
 * @returns {Function|Array<Function>}
 */
function wrapAsync(obj) {
  if (Array.isArray(obj)) {
    return obj.map(wrapAsync);
  }
  return wrapRoute(obj);
}

module.exports = wrapAsync;
