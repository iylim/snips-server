const fs = require('fs').promises;
const path = require('path');


async function logger(req, res, next) {
  const logPath = path.join(__dirname, '..', 'log.txt');
  const logText = `${req.method} ${req.path}: ${Date.now()}\n`;
  try {
    await fs.appendFile(logPath, logText);
  } catch (err) {
    console.error(err);
  } finally {
    next();
  }
}

module.exports = logger;