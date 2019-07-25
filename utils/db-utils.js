const fs = require('fs').promises;
const path = require('path');

/**
 * Gets absolute path to `resource` DB file
 * @param {string} resource
 * @returns {string} db path
 */
const dbpath = resource => path.join(__dirname, '..', 'db', `${resource}.json`);

/**
 * Function to read JSON DB file
 * @param {string} resource name of the file
 * @returns {Promise<Object>}
 */
exports.readJSONFromDB = async resource => JSON.parse(await fs.readFile(dbpath(resource)));

/**
 * Function to write to the JSON DB file
 * @param {string} resource name of the file
 * @param {Object} data
 * @return {Promise<Object>}
 */
exports.writeJSONToDB = (resource, data) => fs.writeFile(dbpath(resource), JSON.stringify(data));