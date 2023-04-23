import { DatabaseType } from 'typeorm';

export default () => ({
  port: parseInt(process.env.ACCOUNT_PORT, 10) || 3000,
  baseUrl: process.env.ACCOUNT_URL_APIS || '',
  marketplaceJsonRpc: process.env.RPC_ENDPOINT,
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DBNAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY || 'secret-key',
    signOptions: process.env.JWT_SIGN_OPTIONS || '4h',
  },
  aws: {
    s3Bucket: process.env.AWS_S3_BUCKET || 'testnet-assets',
    s3AccessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    s3SecretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
  mymetafarm: {
    urlApi: process.env.MYMETAFARM_API_URL,
    accessToken: process.env.MYMETAFARM_ACCESS_TOKEN,
  },
  facebook: {
    appId: process.env.FACEBOOK_APP_ID,
    verifyTokenUrl: process.env.FACEBOOK_VERIFY_TOKEN_URL,
    getInfoTokenUrl: process.env.FACEBOOK_GET_INFO_TOKEN_URL,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    getInfoTokenUrl: process.env.GOOGLE_GET_INFO_TOKEN_URL,
  },
  database: {
    mysql: {
      type: process.env.DB_TYPE || 'mysql',
      username: process.env.DB_USERNAME || 'root',
      host: process.env.DB_HOST || 'localhost',
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      databaseName: process.env.DB_NAME || 'zuj-backend-test',
    },
  },
});
