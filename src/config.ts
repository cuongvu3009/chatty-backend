import dotenv from 'dotenv';
import bunyan from 'bunyan';

dotenv.config();

class Config {
  public DATABASE_URL: string | undefined;
  public JWT_TOKEN: string | undefined;
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public NODE_ENV: string | undefined;
  public CLIENT_URL: string | undefined;
  public SERVER_PORT: string | undefined;
  public REDIS_HOST: string | undefined;

  private readonly DEFAULT_DATABASE_URL =
    'mongodb+srv://cuong:1234@nodeexpressproject.nlzou.mongodb.net/Chatty-App?retryWrites=true&w=majority';
  private readonly DEFAULT_NODE_ENV = 'development';
  private readonly DEFAULT_CLIENT_URL = 'http://localhost:3000';

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URl || this.DEFAULT_DATABASE_URL;
    this.JWT_TOKEN = process.env.JWT_TOKEN || '';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
    this.NODE_ENV = process.env.NODE_ENV || this.DEFAULT_NODE_ENV;
    this.CLIENT_URL = process.env.CLIENT_URL || this.DEFAULT_CLIENT_URL;
    this.SERVER_PORT = process.env.SERVER_PORT || '';
    this.REDIS_HOST = process.env.REDIS_HOST || '';
  }

  //	logger
  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }

  //	make sure all env variable in config exist
  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined`);
      }
    }
  }
}

export const config: Config = new Config();
