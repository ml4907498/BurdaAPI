import crypto from 'crypto';
import mongoose, { ConnectOptions } from 'mongoose';

// generate a random UUID
export const generateUUID = () => crypto.randomUUID();

// initialize the DB with the URI and database name
export const initDB = (env: any) => {
  mongoose
    .connect(env.MONGODB_URI, {
      dbName: env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
      console.log('Mongodb connected....');
    })
    .catch((err) => console.log(err.message));

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db...');
  });

  mongoose.connection.on('error', (err) => {
    console.log(err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
  });
};
