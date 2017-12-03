let mongoose = require('mongoose');
let User = mongoose.model('User');
let loginService = require('../services/login.service');

exports.signup = function (req, res) {
  let user = new User({
    name: req.body.name,
    password: loginService.hashPassword(req.body.password),
    email: req.body.email
  });
  let query = {
    $or: [{name: req.body.name}, {email: req.body.email}]
  };
  User.findOne(query, function (err, userCheck) {
    if (err) {
      return res
        .status(500)
        .send(err);
    } else {
      if (!userCheck) {
        user.save(function (err) {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .send(err);
          } else {
            console.log(user);
            return res
              .status(200)
              .send({token: loginService.createToken(user)});
          }
        });
      }else{
        let error = '';
        if (userCheck.name === req.body.name) {
          error = 'El nombre de usuario esta en uso';
        }
        if (userCheck.email === req.body.email){
          error = 'La dirección de correo electronico esta en uso';
        }
        return res
          .status(400)
          .send({message: error});
      }
    }
  });
};

exports.getUserToken = function (req, res) {
  let query = {
    email: req.body.email,
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
          .status(400)
          .send({message: 'El email y la contraseña que ingresó no coinciden con nuestros registros. ' +
          'Por favor, revise e inténtelo de nuevo.'});
      }else{
        return res
          .status(200)
          .send({token: loginService.createToken(user)});
      }
    }
  });
};
