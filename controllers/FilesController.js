import { v4 as uuidv4 } from 'uuid';
import getUser from '../utils/getUser';

const { ObjectId } = require('mongodb');
const fs = require('fs');
const dbClient = require('../utils/db');

class FilesController {
  static async postUpload(req, res) {
    const userInfo = await getUser(req, res);
    console.log('This is userInfo: ', userInfo);
    const { name, type, data } = req.body;
    let { isPublic } = req.body;
    if (!name) return res.status(400).json({ error: 'Missing name' });
    if (!type || ['folder', 'file', 'image'].indexOf(type) === -1) return res.status(400).json({ error: 'Missing type' });
    if (!data && type !== 'folder') return res.status(400).json({ error: 'Missing data' });
    let parentId = req.body.parentId || 0;
    parentId = parentId === '0' ? 0 : parentId;
    console.log('This is parent: ', parentId);
    if (parentId !== 0) {
      const value = await dbClient.files.findOne({ _id: `ObjectId(${parentId})` });
      console.log('This os value: ', value);
      if (!value) return res.status(400).json({ error: 'Parent not found' });
      console.log('This is value: ', value);

      if (type !== 'folder') {
        return res.status(400).json({ error: 'Parent is not a folder' });
      }
    }
    if (type === 'folder') {
      if (isPublic === undefined) isPublic = false;

      const doc = {
        userId: userInfo._id,
        name,
        type,
        isPublic,
        parentId,
      };
      const file = await dbClient.files.insertOne(doc);

      const { ops } = file;

      const obj = ops[0];

      return res.status(201).json({
        id: obj._id,
        userId: obj.userId,
        name: obj.name,
        type: obj.type,
        isPublic: obj.isPublic,
        parentId: obj.parentId,
      });
    }

    const folderPath = process.env.FOLDER_PATH || '/tmp/files_manager';

    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { resursive: true });

    const fileId = uuidv4();

    const localPath = `${folderPath}/${fileId}`;

    const decodedData = Buffer.from(data, 'base64');

    await fs.promises.writeFile(localPath, decodedData.toString(), { flag: 'w+' });

    const obj = await dbClient.files.insertOne({
      userId: ObjectId(userInfo._id),
      name,
      type,
      isPublic,
      parentId,
      localPath,
    });

    const { ops } = obj;
    const obj2 = ops[0];

    return res.status(201).json({
      id: obj2._id,
      userId: obj2._id,
      name: obj2.name,
      type: obj2.type,
      isPublic: obj2.isPublic,
      parentId: obj2.parentId,
    });
  }
}
export default FilesController;
