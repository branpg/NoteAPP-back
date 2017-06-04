let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let noteSchema = new Schema({
    title: {
      type: String
    },
    description: {
      type: String
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Note', noteSchema);
