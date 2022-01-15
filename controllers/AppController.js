import { response } from 'express';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const getStatus = () => {
  if (redisClient.isAlive() && dbClient.isAlive()) {
    response.status(200);
    return response.send({ redis: true, db: true });
  }
};

const getStats = () => {
  const numUsers = dbClient.nbUsers();
  const numFiles = dbClient.nbFiles();
  response.status(200);
  return response.send({ users: numUsers, files: numFiles });
};

module.exports = {
  getStats,
  getStatus,
}
