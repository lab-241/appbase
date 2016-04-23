/**
 * STAGING ENV datasource config
 * Model configuration used by others environments (dev, prod and test)
 *
 * @author Michael P.O
 */
module.exports = {
  db: {
    name: process.env.NODE_ENV,
    connector: process.env.DB_CONNECTOR || 'mongodb',
    hostname: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
};
