let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  password: {
    type: String
  }
});

module.exports = mongoose.model('User', userSchema);
