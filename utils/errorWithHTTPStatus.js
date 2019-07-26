/**
 * Error object containing user friendly message and HTTP status code.
 */
class ErrorWithHTTPStatus extends Error {
  /**
   * 
   * @param {String} message user-friendly error message that can be displayed in front-end
   * @param {*} status HTTP status code
   */
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

module.exports = ErrorWithHTTPStatus;