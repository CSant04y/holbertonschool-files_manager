import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const express = require('express');

module.exports = (app) => {
  const router = express.Router();
  app.use('/', router);

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
    UsersController.postNew(req, res);
  });

  router.get('/connect', (req, res) => {
    console.log('test4');
    AuthController.getConnect(req, res);
  });

  router.get('/disconnect', (req, res) => {
    console.log('test5');
    AuthController.getDisconnect(req, res);
  });

  router.get('/users/me', (req, res) => {
    console.log('test6');
    UsersController.getMe(req, res);
  });
};
