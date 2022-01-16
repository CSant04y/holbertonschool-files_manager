const sha1 = require('sha1');

import dbClient from '../utils/db';

class AuthController {
  static async getConnect(req, res) {
    const header = req.header('Authorization').split(' ');
    const encodedStr = header[1];
    const buffObj = Buffer.from(encodedStr, 'base64');
    const decodedStr = buffObj.toString('utf8');
    const user = decodedStr.split(':');

    const value = await dbClient.users.findOne({ email: user[0], password: sha1(user[1]) });
    if (!value) return res.status(401).send({ error: 'Unauthorized' });


    // console.log(encodedStr.toString(''));
    // console.log(atob(encodedStr));
    // const { email, password } = header.
  }
}

export default AuthController;
