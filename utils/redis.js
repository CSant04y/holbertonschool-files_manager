import Redis from 'redis';
const { promisify } = require('util');

class RedisClient {

  constructor() {
    this.cli = Redis.createClient();
    this.cli.on('error', (err) => {
        console.log(`Redis client not connected to the server: ${err}`);
    })
  };

  isAlive() {
    // const yesOrNo = this.cli.on('connect', () => {return true });
    // console.log(yesOrNo);
    return this.cli.connected;
  }

  async get(key) {
    const getAsync = await promisify(this.cli.get).bind(this.cli);
    const value = await getAsync(key);
    return value;
  }
  async set(key, value, duration) {
    const setAsync = await promisify(this.cli.set).bind(this.cli);
    await setAsync(key, value, 'EX', duration);
  };

  async del(key) {
    const delAsync = await promisify(this.cli.del).bind(this.cli);
    await delAsync(key);
  }

};

const redisClient = new RedisClient();
module.exports = redisClient;