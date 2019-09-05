// const fs = require('fs').promises;
const path = require('path');
const format = require('pg-format');
// const shortid = require('shortid');
const db = require('../db');
const { readJSONFromDB, writeJSONToDB } = require('../utils/db-utils');
const ErrorWithHTTPStatus = require('../utils/errorWithHTTPStatus');
// const dbpath = path.join(__dirname, '..', 'db', 'snippets.json');

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
exports.insert = async ({ author, code, title, description, language }) => {
  try {
    if (!author || !code || !title || !description || !language) throw new ErrorWithHTTPStatus('Missing properties', 400);
    const result = await db.query(`INSERT INTO snippet (code, title, description, author, language) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [code, title, description, author, language]);
    return result.rows[0];
    // if (!author || !code || !title || !description || !language) throw new ErrorWithHTTPStatus('Missing Properties', 400);
    // const snippets = JSON.parse(await fs.readFile(dbpath));
    // snippets.push({
    //   id: shortid.generate(),
    //   author,
    //   code,
    //   title,
    //   description,
    //   language,
    //   comments: [],
    //   favorites: 0,
    // });
    // await fs.writeFile(dbpath, JSON.stringify(snippets));
    // return snippets[snippets.length - 1];
  } catch (error) {
    if (error instanceof ErrorWithHTTPStatus) throw error;
    throw new ErrorWithHTTPStatus('Database Error!');
  }
};

/**
 * Selects snippets from db.
 * Can accept optional query objects to filter results.
 * Otherwise returns all snippets
 * @param {Object} [query]
 * @returns {Promise<Snippet>[]} array of Snippet Objects
 */
exports.select = async (query = {}) => {
  try {
    const clauses = Object.keys(query).map((key, i) => `%I = $${i + 1}`).join(' AND ');
    const formattedSelect = format(`SELECT * FROM snippet ${clauses.length ? `WHERE ${clauses}` : ''}`, ...Object.keys(query));
    const results = await db.query(formattedSelect, Object.values(query));   
    return results.rows;
    // const result = await db.query('SELECT * FROM snippet');
    // return result.rows;
    
    // const snippets = JSON.parse(await fs.readFile(dbpath));
    // const filtered = snippets.filter(snippet => Object.keys(query).every(key => query[key] === snippet[key]));
    // return filtered;
  } catch (error) {
    throw new ErrorWithHTTPStatus('Database Error!');
  }
};

/**
 * updates snippet in DB
 * @param {String} id 
 * @param {Object} newData data to be updated into db
 */
exports.update = async (id, newData) => {
  // TODO: error on Id not found
  if (!id) throw ErrorWithHTTPStatus('Invalid Id', 400);
  try {
    const { author, code, title, description, language } = newData;
    await db.query(`UPDATE snippet SET 
      author = COALESCE($2, author),
      code = COALESCE($3, code),
      title = COALESCE($4, title),
      description = COALESCE($5, description),
      language = COALESCE($6, language)
    WHERE id = $1`,
    [id, author, code, title, description, language]);
  } catch (err) {
    throw err;
  }
};
// const snippets = await readJSONFromDB('snippets');
// let foundId = false;
// const updatedSnippets = snippets.map(snippet => {
//   if (snippet.id !== id) return snippet;
//   foundId = true;
//   Object.keys(newData).forEach(key => {
//     if (key in snippet) {
//       snippet[key] = newData[key];
//     } else {
//       throw new ErrorWithHTTPStatus('Key does not Exist!', 400);
//     }
//   });
//   if (!foundId) throw new ErrorWithHTTPStatus('Id not found!', 400);
//   return snippet;
// });
// return writeJSONToDB('snippets', updatedSnippets);
// } catch (error) {
//   throw new ErrorWithHTTPStatus('Database Error!');
// }
// };

/**
 * Deletes a snippet with a given ID
 * @param {string} ID
 */
exports.delete = async id => {
  try {
    const result = await db.query(`SELECT id from snippet WHERE id = $1`, [id]);
    if (result.rows.length === 0) throw new ErrorWithHTTPStatus('Snippet Does not Exist!', 400);
    return db.query(`DELETE FROM snippet WHERE id = ${id}`);
    // const snippets = await readJSONFromDB('snippets');
    // const filtered = snippets.filter(snippet => snippet.id !== id);
    // if (filtered.length === 0) throw new ErrorWithHTTPStatus('Snippet Does not Exist!', 400);
    // return writeJSONToDB('snippets', filtered);
  } catch (error) {
    throw new ErrorWithHTTPStatus('Database Error!');
  }
};
