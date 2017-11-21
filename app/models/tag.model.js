let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let tagSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String
  }
});

module.exports = mongoose.model('Tag', tagSchema);
