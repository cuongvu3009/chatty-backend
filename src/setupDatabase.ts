import mongoose from 'mongoose';
import { config } from './config';

//	logger
import Logger from 'bunyan';

const log: Logger = config.createLogger('setupDatabase');

const databaseConnection = () => {
  const connect = () => {
    mongoose
      .set('strictQuery', true)
      .connect(`${config.DATABASE_URL}`)
      .then(() => log.info('Database is succesfully connected!'))
      .catch((err) => {
        log.error(err);
        return process.exit(1);
      });
  };
  connect();

  //	if db is disconnected, then try to reconnect again
  mongoose.connection.on('disconnected', connect);
};

export default databaseConnection;
