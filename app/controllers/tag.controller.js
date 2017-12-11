let mongoose = require('mongoose');
let Tag = mongoose.model('Tag');
let Promise = require('bluebird');

exports.getTags = function (req, res) {
  let query = {user: req.user};
  Tag.find(query)
    .exec(function (err, notes) {
      if (err) {
        res.send(500, err.message);
      } else {
        res.status(200).jsonp(notes);
      }
    });
};
