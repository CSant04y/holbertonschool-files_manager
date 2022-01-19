const { ObjectId } = require('mongodb');
const dbClient = require('./db');
const redisClient = require('./redis');

async function getUser(req, res) {
  const token = req.header('X-token');

  if (!token) return res.status(401).send({ error: 'Unauthorized' });
  const user = await redisClient.get(`auth_${token}`);

  const value = await dbClient.users.findOne({ _id: ObjectId(user) });

  if (!value) return res.status(401).send({ error: 'Unauthorized' });

  return (value);
}

export default getUser;
