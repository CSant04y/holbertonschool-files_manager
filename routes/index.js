const express = require('express');
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

module.exports = (app) => {
  const router = express.Router();
  app.use('/', router);
  console.log('Hi Im here');
  router.get('/status', (req, res) => {
    console.log('test1');
    AppController.getStatus(req, res);
  });

  router.get('/stats', (req, res) => {
    console.log('test2');
    AppController.getStats(req, res);
  });

  router.post('/users', (req, res) => {
    console.log('test3');
    console.log(res.status);
    UsersController.postNew(req, res);

  });
}
