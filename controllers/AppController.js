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

  static async getStats(req, res) {
    const numUsers = await dbClient.nbUsers();
    //console.log(numUsers);
    const numFiles = await dbClient.nbFiles();
    //console.log(numFiles);
    //res.status(200);
    res.status(200).send({ users: numUsers, files: numFiles });
  }
}

export default AppController;
