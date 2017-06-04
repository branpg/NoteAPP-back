let mongoose = require('mongoose');
let User = mongoose.model('User');
let loginService = require('../services/login.service');

exports.signup = function (req, res) {
  let user = new User({
    name: req.body.name,
    password: loginService.hashPassword(req.body.password)
  });
  user.save(function (err) {
    if (err) {
      return res
        .status(500)
        .send(err);
    } else {
      return res
        .status(200)
        .send({token: loginService.createToken(user)});
    }
  });
};

exports.getUserToken = function (req, res) {
  let query = {
    name: req.body.name,
    password: loginService.hashPassword(req.body.password)
  };
  User.findOne(query, function (err, user) {
    if (err) {
      return res
        .status(500)
        .send(err);
    } else {
      if (!user) {
        return res
          .status(500)
          .send({message: 'El nombre de usuario y la contraseña que ingresaste no coinciden con nuestros registros. ' +
          'Por favor, revisa e inténtalo de nuevo.'});
      }else{
        return res
          .status(200)
          .send({token: loginService.createToken(user)});
      }
    }
  });
};
