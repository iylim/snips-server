const express = require('express');
const snippets = require('../controllers/snippets.controller');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to Snips');
});

router.get('/api', (req, res) => {
  res.send('Welcome to the Snips API');
});

/* Snippets Routes */
router.post('/api/snippets', snippets.createSnippet);
router.get('/api/snippets', snippets.getAll);
router.get('/api/snippets/:id', snippets.getOne);
router.patch('/api/snippets/:id', snippets.update);
router.delete('/api/snippets/:id', snippets.delete);

module.exports = router;