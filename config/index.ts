import dotenv from 'dotenv';

dotenv.config();

const nodeEnv = process.env.NODE_ENV || 'development';
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce-backend';

if (nodeEnv === 'production' && !process.env.MONGO_URI) {
  throw new Error('MONGO_URI must be set in production');
}

interface Config {
  port: string | number;
  nodeEnv: string;
  mongoUri: string;
  corsOrigin: string | string[];
}

const config: Config = {
  port: process.env.PORT || 5000,
  nodeEnv,
  mongoUri,
  corsOrigin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*'
};

export default config;
