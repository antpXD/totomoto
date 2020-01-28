const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//mongoose returns promise
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err.message);
    process.exit(1); // will exit with failure
  }
};

module.exports = connectDB;
