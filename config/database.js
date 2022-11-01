const mongoose = require('mongoose');
const mongodbConfig = require('./mongodb');

function buildMongodbUrl() {
  let credentials = mongodbConfig[process.env.NODE_ENV];
  return `mongodb+srv://${credentials.user}:${credentials.password}@${credentials.host}/${credentials.database}?retryWrites=true&w=majority`;
}

module.exports = {
  mongoDBConnect: () => {
    mongoose.connect(buildMongodbUrl(), { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.once('open', () => console.log('Database connection is OK'));
    mongoose.connection.on('error', err => console.log('Database connection failed: ' + err));
  }
}
