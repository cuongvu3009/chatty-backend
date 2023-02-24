import mongoose from 'mongoose';
import { config } from './config';

const databaseConnection = () => {
  const connect = () => {
    mongoose
      .set('strictQuery', true)
      .connect(`${config.DATABASE_URL}`)
      .then(() => console.log(`Database is succesfully connected!`))
      .catch((err) => {
        console.log(err);
        return process.exit(1);
      });
  };
  connect();

  //	if db is disconnected, then try to reconnect again
  mongoose.connection.on('disconnected', connect);
};

export default databaseConnection;
