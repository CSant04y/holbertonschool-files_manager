const AppController = require('../controllers/AppController');

module.exports = (app) => {
  app.get('/status', (request, response) => {
    AppController.getStatus();
  });

  app.get('/stats', (request, response) => {
    AppController.getStats();
  });
}