export default () => ({
  port: parseInt(process.env.MARKET_PORT, 10) || 3000,
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
