const mongoose = require('mongoose');

// Replace 'your-db-uri' with your MongoDB database URI
const dbURI = 'mongodb+srv://kandimallatejasri:umTeQOY2QxlyJW1k@cluster0.yiez64a.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI, {
  dbName:"e-commerce",
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB database!');
});

module.exports = db;
