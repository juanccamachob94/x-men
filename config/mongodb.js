module.exports = {
  development: {
    database: process.env.MONGODB_DEV_DATABASE,
    host: process.env.MONGODB_DEV_HOST,
    password: process.env.MONGODB_DEV_PASSWORD,
    user: process.env.MONGODB_DEV_USER
  },
  test: {
    database: process.env.MONGODB_TEST_DATABASE,
    host: process.env.MONGODB_TEST_HOST,
    password: process.env.MONGODB_TEST_PASSWORD,
    user: process.env.MONGODB_TEST_USER
  },
  production: {
    database: process.env.MONGODB_PROD_DATABASE,
    host: process.env.MONGODB_PROD_HOST,
    password: process.env.MONGODB_PROD_PASSWORD,
    user: process.env.MONGODB_PROD_USER
  }
}
