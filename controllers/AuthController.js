import { v4 as uuidv4 } from 'uuid';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const sha1 = require('sha1');

class AuthController {
  static async getConnect(req, res) {
    const header = req.header('Authorization').split(' ');

    const encodedStr = header[1];

    const buffObj = Buffer.from(encodedStr, 'base64');

    const decodedStr = buffObj.toString('utf8');

    const [email, password] = decodedStr.split(':');

    if (!email || !password) return res.status(401).send({ error: 'Unauthorized' });
    console.log('This is email + pass that wa returned: ', email, password);

    const hash = sha1(password);

    const value = await dbClient.users.findOne({ email, password: hash });
    console.log('This is value that wa returned: ', value);

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
    return res.status(204).send();
  }
}

export default AuthController;
// curl 0.0.0.0:5000/users/me -H "X-Token: 565073bb-3e53-4fc1-80ba-34e341cecd5b" ; echo ""
