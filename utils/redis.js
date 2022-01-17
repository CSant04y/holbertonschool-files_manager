import Redis from 'redis';

const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.cli = Redis.createClient();
    this.getAsync = promisify(this.cli.get).bind(this.cli);
    this.setAsync = promisify(this.cli.set).bind(this.cli);
    this.cli.on('error', (err) => {
      console.log(`Redis client not connected to the server: ${err}`);
    });
    // this.cli.connect;
  }

  isAlive() {
    return this.cli.connected;
  }

  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }

  async set(key, value, duration) {
    await this.setAsync(key, value, 'EX', duration);
  }

  async del(key) {
    const delAsync = await promisify(this.cli.del).bind(this.cli);
    await delAsync(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
