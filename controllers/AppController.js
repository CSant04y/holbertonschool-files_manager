import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static getStatus(req, res) {
    // console.log(`This is req: ${req}\n\t\nThis is res: ${res.status}`);
    if (redisClient.isAlive() && dbClient.isAlive()) {
      console.log('Condition was met');
      res.status(200);
      return res.send({ redis: true, db: true });
    }
  }

  static getStats(req, res) {
    const numUsers = dbClient.nbUsers();
    const numFiles = dbClient.nbFiles();
    res.status(200);
    return res.send({ users: numUsers, files: numFiles });
  }
}

export default AppController;
