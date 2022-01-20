import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

const express = require('express');

module.exports = (app) => {
  const router = express.Router();
  app.use('/', router);

  router.get('/status', (req, res) => {
    console.log('status');
    AppController.getStatus(req, res);
  });

  router.get('/stats', (req, res) => {
    console.log('stats');
    AppController.getStats(req, res);
  });

  router.post('/users', (req, res) => {
    console.log('users');
    UsersController.postNew(req, res);
  });

  router.get('/connect', (req, res) => {
    console.log('connect');
    AuthController.getConnect(req, res);
  });

  router.get('/disconnect', (req, res) => {
    console.log('disconnect');
    AuthController.getDisconnect(req, res);
  });

  router.get('/users/me', (req, res) => {
    console.log('users and me');
    UsersController.getMe(req, res);
  });

  router.post('/files', (req, res) => {
    console.log('get files');
    FilesController.postUpload(req, res);
  });

  router.get('/files/:id', (req, res) => {
    console.log('Get files with Id');
    FilesController.getShow(req, res);
  });

  router.get('/files', (req, res) => {
    console.log('get files pagination');
    FilesController.getIndex(req, res);
  });
};
