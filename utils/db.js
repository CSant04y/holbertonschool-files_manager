const { MongoClient } = require('mongodb');

// Grabing env variables or defaulting to right
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}`;

console.log(database);
class DBClient {
  constructor() {
    console.log('before construction');

    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      console.log('Before');
      if (client) {
        this.db = client.db(database);
        this.users = this.db.collection('users');
        this.files = this.db.collection('files');
        // this.db = true;
        console.log('Client was true');
      }
      if (err) {
        console.log(err);
        this.db = false;
      }
    });
  }

  isAlive() {
    // console.log(this.db);
    if (!this.db) {
      return !!this.db;
    }
    return !!this.db;
  }

  async nbUsers() {
    const num = await this.users.countDocuments();
    return num;
  }

  async nbFiles() {
    const num = await this.files.countDocuments();
    return num;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
