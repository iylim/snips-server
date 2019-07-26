const express = require('express');
const router = require('./middleware/routes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

/* Middleware */
app.use(express.json());
app.use(logger);
app.use(router);
app.use(errorHandler);

app.listen(5000, () => console.log(`Server running on port 5000`));