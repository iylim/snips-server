const Snippet = require('../models/Snippet.model');
const ErrorWithHTTPStatus = require('../utils/errorWithHTTPStatus');

exports.createSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.insert(req.body);
    res.status(201).send(snippet); 
  } catch (err) {
    next(err);
  }
};

exports.getAll = async ({ query }, res, next) => {
  try { 
    // 1. get data from snippets model
    const snippet = await Snippet.select(query);
    // 2. send it out
    return res.send(snippet);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async ({ params: { id } }, res, next) => {
  try {
    const snippet = await Snippet.select({ id });
    if (snippet.length === 0) {
      throw new ErrorWithHTTPStatus('Id does not exist!', 404);    
    }
    res.send(snippet[0]);
  } catch (err) {
    next(err);
  }
};


exports.update = async (req, res, next) => {
  try {
    const snippet = await Snippet.update(req.params.id, req.body);
    res.status(200).send(snippet);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await Snippet.delete(req.params.id);
    res.status(200).send('Deleted!');
  } catch (err) {
    next(err);
  }
};