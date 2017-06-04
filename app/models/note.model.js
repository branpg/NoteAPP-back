let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let noteSchema = new Schema({
    title: {
      type: String
    },
    description: {
      type: String
    },
    list: [{
      checked: {
        type: Boolean
      },
      value: {
        type: String
      }
    }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Note', noteSchema);
