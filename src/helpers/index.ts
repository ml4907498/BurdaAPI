import crypto from 'crypto';
import mongoose, { ConnectOptions } from 'mongoose';

export const generateUUID = () => crypto.randomUUID();

console.log(process.env.MONGODB_URI);
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
