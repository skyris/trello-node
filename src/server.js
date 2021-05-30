const { PORT } = require('./common/config');
const app = require('./app');
/**
 * @file server.js is the root file for this web application
 * @author Victor Klimov
 * @see <a href="https://github.com/skyris/trello-node">Trello app in NodeJS</a>
 */
app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
