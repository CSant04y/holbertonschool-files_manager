const sha1 = require('sha1');
const { ObjectId } = require('mongodb')
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) return res.status(400).send({ error: 'Missing email' });

    if (!password) return res.status(400).send({ error: 'Missing password' });

    const value = await dbClient.users.findOne({ email });

    if (value) return res.status(400).send({ error: 'Already exist' });

    await dbClient.users.insertOne({ email, password: sha1(password) }, (err) => {
      if (err) console.log(err);
    });
    const sameValue = await dbClient.users.findOne({ email });
    const sameUser = { id: sameValue._id, email };

    return res.status(201).send(sameUser);
  }

  static async getMe(req, res) {
    const token = req.header('X-token').split(' ');

    const user = await redisClient.get(`auth_${token}`);

    const value = await dbClient.users.findOne({ _id: ObjectId(user) });

    if (!value) return res.status(401).send({ error: 'Unauthorized' });

    return res.send({ id: value._id, email: value.email });
  }

}
export default UsersController;
