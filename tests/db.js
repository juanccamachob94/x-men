const mongoose = require('mongoose');

module.exports = {
  closeDatabase: async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  },
  clearDatabase: async () => {
    const collections = mongoose.connection.collections;
    for(const key in collections)
      await collections[key].deleteMany({});
  }
}
