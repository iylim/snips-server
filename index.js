const Snippet = require('./models/Snippet.model');

async function testModels() {
  // const snippets = await Snippet.select();
  // console.log(snippets);
  try {
    const newSnippet = await Snippet.insert({
      author: 'Kfed',
      code: 'code code code',
      title: 'All your base are belong to us',
      description: 'does not compute',
      language: 'assembly',
    });
    console.log(newSnippet);
  } catch (error) {
    console.error(error);
  }
}

testModels();
