const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

//passwordLocalMonggose will enforce password to be unique
const User = new Schema({
  username: { type : String, unique : true, required : true, dropDups: true },
  password: { type : String },
  role: { type: String, default: 'user' }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model( 'User', User );
