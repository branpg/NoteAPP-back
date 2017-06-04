let jwt = require('jwt-simple');
let moment = require('moment');
let ENV = require('../config/env');

exports.createToken = function (user) {
  let payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, ENV.TOKEN_SECRET);
};

exports.hashPassword = function (pass) {
  return pass;
};
