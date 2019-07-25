const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');
const { readJSONFromDB, writeJSONToDB } = require('../utils/db-utils');


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

/**
 * Inserts a new snippet into DB
 * @param {Snippet} newSnippet - the data to create the snippet with
 * @returns {Promise<Snippet>} the created snippet
 */

/* Create */
exports.insert = async ({ author, code, title, description, language }) => {
  // read snippets
  // grab data from the new snippet (validate)
  // make newSnippet a proper object
  // generate default data (id, comments, favorites)
  // push that object into snippets
  // write back to the file
  try {
    if (!author || !code || !title || !description || !language) throw Error('Missing Properties');
    const snippets = JSON.parse(await fs.readFile(dbpath));
    snippets.push({
      id: shortid.generate(),
      author,
      code,
      title,
      description,
      language,
      comments: [],
      favorites: 0,
    });
    await fs.writeFile(dbpath, JSON.stringify(snippets));
    return snippets[snippets.length - 1];
  } catch (error) {
    console.error('ERORR: Snippet did not post');
    console.error(error);
    throw error;
  }
};

/* Read */

/**
 * Selects snippets from db.
 * Can accept optional query objects to filter results.
 * @param {Object} [query]
 * @returns {Promise<Snippet>[]} array of Snippet Objects
 */

exports.select = async (query = {}) => {
  // read the file
  // parse the data
  // filter snippets with query
  // check if every query keys
  // check if snippet[key] = query[key]
  // return the data
  try {
    const snippets = JSON.parse(await fs.readFile(dbpath));
    const filtered = snippets.filter(snippet => Object.keys(query).every(key => query[key] === snippet[key]));
    return filtered;
  } catch (error) {
    console.error('ERROR: in Snippet Model');
    console.error(error);
    throw error;
  }
};

exports.update = async (id, newData) => {
  try {
    const snippets = await readJSONFromDB('snippets');
    const updatedSnippets = snippets.map(snippet => {
      if (snippet.id !== id) return snippet;
      Object.keys(newData).forEach(key => {
        if (key in snippet) {
          snippet[key] = newData[key];
        }
      });
      return snippet;
    });
    // const filtered = snippets.filter(snippet => snippet.id === id);
    // const updatedSnips = Object.assign(snippets, filtered);
    // console.log(updatedSnips);
    return writeJSONToDB('snippets', updatedSnippets);
  } catch (error) {
    console.error(error);
  }
};

/* Delete */
/**
 * Deletes a snippet with a given ID
 * @param {string} ID
 */

exports.delete = async id => {
  try {
    const snippets = await readJSONFromDB('snippets');
    const filtered = snippets.filter(snippet => snippet.id !== id);
    return writeJSONToDB('snippets', filtered);
  } catch (error) {
    console.error('ERROR: Entry was not deleted', error);
    throw error;
  }
};
