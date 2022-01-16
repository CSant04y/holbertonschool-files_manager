import dbClient from '../utils/db';

const sha1 = require('sha1');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email) return res.status(400).send({ error: 'Missing email' });

    if (!password) return res.status(400).send({ error: 'Missing password' });

    const value = await dbClient.users.findOne({ email });
    // const user = { _id: value._id, email };
    // console.log(user);
    // console.log('Value: ', value._id);

    if (value) return res.status(400).send({ error: 'Already exist' });

    await dbClient.users.insertOne({ email, password: sha1(password) }, (err) => {
      if (err) console.log(err);
    });
    const sameValue = await dbClient.users.findOne({ email });
    const sameUser = { _id: sameValue._id, email };
    console.log(sameUser);

    return res.status(201).send(sameUser);
  }
}
export default UsersController;
