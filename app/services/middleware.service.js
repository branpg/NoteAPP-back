let jwt = require('jwt-simple');
let moment = require('moment');
let ENV = require('../config/env');

exports.ensureAuthenticated = function(req, res, next) {
  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: 'Tu petición no tiene cabecera de autorización'});
  }

  let token = req.headers.authorization.split(' ')[1];
  let payload = jwt.decode(token, ENV.TOKEN_SECRET);

  if(payload.exp <= moment().unix()) {
    return res
      .status(401)
      .send({message: 'El token ha expirado'});
  }

  req.user = payload.sub;
  next();
};
