import { MongoClient } from 'mongodb';

const url = process.env.MONGO_URI;
const database = process.env.MONGO_DATABASE;

if (url === undefined || database === undefined) {
  throw new Error('Provide Mongo DB connection string');
}

const clinet = new MongoClient(url);
clinet
  .connect()
  .then(() => {
    console.log('Mongo DB Connected');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

export default clinet.db(database);
