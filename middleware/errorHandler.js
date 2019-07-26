const ErrorWithHTTPStatus = require('../utils/errorWithHTTPStatus');

/**
 * Sends appropriate error message and code to the client
 * @param {Error} err 
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
const errorHandler = (err, req, res, next) => {
  if (err instanceof ErrorWithHTTPStatus) {
    res.status(err.status).send(err.message);
  }
  res.status(500).send('Server Error!');
};

module.exports = errorHandler;