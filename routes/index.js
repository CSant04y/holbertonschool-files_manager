const express = require('express');
import AppController from '../controllers/AppController';

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
}
