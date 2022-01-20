const { ObjectId } = require('mongodb');
const dbClient = require('./db');
const redisClient = require('./redis');

async function getUser(req) {
  const token = req.header('X-token');
  console.log('This is token: ', token);
  if (!token) {
    return null;
  }
  const user = await redisClient.get(`auth_${token}`);

  if (!user) {
    return null;
  }

  const value = await dbClient.users.findOne({ _id: ObjectId(user) });
  console.log('This is value: ', value);

  if (!value) {
    return null;
  }

  return (value);
}

export default getUser;
