let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let noteSchema = new Schema({
    title: {
      type: String
    },
    description: {
      type: String
    },
    list: [
      {
        checked: {
          type: Boolean
        },
        value: {
          type: String
        }
      }
    ],
    color: {
      type: String,
      default: 'none'
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    sticky: {
      type: Boolean,
      default: false
    },
    isList: {
      type: Boolean,
      default: false
    },
    tags: [{
      type: Schema.Types.ObjectId,
      ref: 'Tag'
    }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Note', noteSchema);
