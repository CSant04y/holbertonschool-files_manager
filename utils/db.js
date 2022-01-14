const MongoClient = require('mongodb').MongoClient;

// Grabing env variables or defaulting to right
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}`;

class DBClient {
  constructor() {
    console.log('before construction');

    this.DB = new MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      console.log('Before');
      if (client) {
        this.db = client.db(database);
        this.users = this.db.collection('users');
        this.files = this.db.collection('files');
        this.db = true;
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
      return false;
    }
    return true;
  }

  // async nbUsers() {
  //   ;
  // }

  // async nbFiles() {
  //   ;
  // }
}

const dbClient = new DBClient();
module.exports = dbClient;
