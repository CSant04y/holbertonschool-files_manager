const { ObjectId } = require('mongodb');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

class FilesController {
  static async postUpload(req, res) {
    const token = req.header('X-token');
    if (!token) return res.status(401).send({ error: 'Unauthorized' });
    const { name, type, data  } = req.body;
  }
}
