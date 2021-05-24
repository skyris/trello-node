function isFunction(fn) {
  return (
    fn &&
    ({}.toString.call(fn) === '[object Function]' ||
      {}.toString.call(fn) === '[object AsyncFunction]')
  );
}

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

function wrapAsync(obj) {
  if (Array.isArray(obj)) {
    return obj.map(wrapAsync);
  }
  return wrapRoute(obj);
}

module.exports = wrapAsync;
