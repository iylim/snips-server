const fs = require('fs').promises;
const path = require('path');

const dbpath = path.join(__dirname, '..', 'db', 'snippets.json');

/**
 * @typedef {Object} Snippet
 * @property {string} id
 * @property {string} author
 * @property {string} code
 * @property {string} title
 * @property {string} description
 * @property {string} language
 * @property {string[]} comments
 * @property {number} favorites
 */

/* Create */
exports.post = async () => {
  const something = await fs.appendFile(dbpath);
};

/**
 * Selects snippets from db.
 * Can accept optional query objects to filter results.
 * @param {Object} [query]
 * @returns {Promise<Snippet>[]} array of Snippet Objects
 */

exports.select = async (query = {}) => {
  try {
    // read the file
    // parse the data
    const snippets = JSON.parse(await fs.readFile(dbpath));
    // filter snippets with query
    // check if every query keys
    // check if snippet[key] = query[key]
    const filtered = snippets.filter(snippet => Object.keys(query).every(key => query[key] === snippet[key]));
    // return the data
    return filtered;
  } catch (error) {
    console.log('ERROR in Snippet Model');
    throw error;
  }
};
/* Update */
/* Delete */
