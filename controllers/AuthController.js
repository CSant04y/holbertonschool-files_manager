import dbClient from '../utils/db';
import redisClient from '../utils/redis';

import { v4 as uuidv4 } from 'uuid';

const sha1 = require('sha1');

class AuthController {
  static async getConnect(req, res) {
    const header = req.header('Authorization').split(' ');
    const encodedStr = header[1];
    const buffObj = Buffer.from(encodedStr, 'base64');
    const decodedStr = buffObj.toString('utf8');
    const [email, password] = decodedStr.split(':');

    const value = await dbClient.users.findOne({ email, password: sha1(password) });
    // console.log(`This is the output of user: `, value);
    if (!value) return res.status(401).send({ error: 'Unauthorized' });
    const token = uuidv4();
    const tokenKey = `auth_${token}`;

    await redisClient.set(tokenKey, value._id.toString(), 86400);
    // console.log('this is token ' + token);
    const tok = { token };
    // console.log(tok);
    return res.status(200).send(tok);
  }

  static async getDisconnect(req, res) {
    const token = req.header('X-token').split(' ');
    const key = `auth_${token}`;

    const user = await redisClient.get(key);

    if (!user) return res.status(401).send({ error: 'Unauthorized' });

    redisClient.del(key);
    return res.status(204);
  }
}

export default AuthController;
// curl 0.0.0.0:5000/users/me -H "X-Token: 76b7f030-f792-4024-9a59-70431fccee77" ; echo ""