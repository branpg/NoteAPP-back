let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required : true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required : true
  },
  opts: {
    newElementAtEnd: {
      type: Boolean,
      default: true
    },
    moveCheckedToBottom: {
      type: Boolean,
      default: true
    },
    theme: {
      type: Number,
      default: 0
    }
  }
});

module.exports = mongoose.model('User', userSchema);
