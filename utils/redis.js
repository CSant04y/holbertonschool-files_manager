import Redis from 'redis';

class RedisClient {
  constructor() {
    this.cli = Redis.createClient();
    this.cli.on('error', (err) => {
        console.log(`Redis client not connected to the server: ${err}`);
    })
  }
}
