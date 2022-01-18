const { ObjectId } = require('mongodb');
import UsersController from '../controllers/UsersController';
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');
import getUser from '../utils/getUser';

class FilesController {
  static async postUpload(req, res) {
    const userInfo = await getUser(req, res);
    const { name, type, parentId, isPublic, data } = req.body;
    if (!name) return res.status(400).json({error: 'Missing name' });
    if (!type || ['folder', 'file', 'image'].indexOf(type) === -1) return res.status(400).json({ error: 'Missing type' });
    if (!data && type != 'folder') return res.status(400).json({error: 'Missing data' });
    if (!parentId) parentId = 0;
    else {
      
    }
    
    console.log('thisis type test after: ',type)
    console.log('This is name: ',name);
    console.log('This is type: ',type);
    console.log('This is data: ',data);
    console.log('This is isPublic: ',isPublic);
    console.log('This is parentId: ',parentId);
  }
}
export default FilesController;
