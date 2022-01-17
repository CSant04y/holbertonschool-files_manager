const sha1 = require('sha1');

const dbClient = require('../utils/db');
const redisClient = require('../utils/db');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    // console.log(email, password);

    if (!email) return res.status(400).send({ error: 'Missing email' });

    if (!password) return res.status(400).send({ error: 'Missing password' });

    const value = await dbClient.users.findOne({ email });

    if (value) return res.status(400).send({ error: 'Already exist' });

    await dbClient.users.insertOne({ email, password: sha1(password) }, (err) => {
      if (err) console.log(err);
    });
    const sameValue = await dbClient.users.findOne({ email });
    const sameUser = { id: sameValue._id, email };
    // console.log('this is sameUser:', sameUser);

    return res.status(201).send(sameUser);
  }

  static async getMe(req, res) {
    const token = req.header('X-token').split(' ');
    console.log('This is the token: ', token);

    const user = await redisClient.get(`auth_${token}`);
    console.log(user);


    // const value = await dbClient.users.findOne({ _id: ObjectId(token) });
    // console.log('This is Value: ', value);
    // if (!value) return res.status(401).send({ error: 'Unauthorized' });
    // console.log(value);
    // const userObj = { id: value._id, email: value.email };
    // // console.log(userObj);
    // return userObj;
  }

}
export default UsersController;
