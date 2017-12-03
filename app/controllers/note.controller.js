let mongoose = require('mongoose');
let Note = mongoose.model('Note');

exports.getAllNotes = function (req, res) {
  console.log('GET ALL NOTES');
  console.log(req.query);
  console.log(req.params);
  let query = {owner: req.user};
  if (req.query.search) {
    query['$or'] = [
      {'title': {'$regex': '.*' + req.query.search + '.*', '$options': 'i'}},
      {'description': {'$regex': '.*' + req.query.search + '.*', '$options': 'i'}},
      {'list.value': {'$regex': '.*' + req.query.search + '.*', '$options': 'i'}}
    ];
  }
  if (req.query.sticky) {
    query.sticky = req.query.sticky;
  }
  Note.find(query)
    .sort({_id: -1})
    .exec(function (err, notes) {
      if (err) {
        res.send(500, err.message);
      } else {
        res.status(200).jsonp(notes);
      }
    });
};

exports.getNote = function (req, res) {
  console.log('GET NOTE');
  console.log(req.query);
  console.log(req.params);
  Note.findById(req.params.id)
    .exec(function (err, note) {
      if (err) {
        return res.send(500, err.message);
      }
      res.status(200).jsonp(note);
    });
};

exports.newNote = function (req, res) {
  console.log('NEW NOTE');
  console.log(req.body);
  let source = {};
  if (req.body.title) {
    source.title = req.body.title;
  }
  if (req.body.description) {
    source.description = req.body.description;
  }
  if (req.body.list) {
    source.list = req.body.list;
  }

  source.owner = req.user;

  let note = new Note(source);

  note.save(function (err, note) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).jsonp(note);
  });
};

exports.updateNote = function (req, res) {
  console.log('UPDATE NOTE');
  console.log(req.params);
  console.log(req.body);
  Note.findById(req.params.id, function (err, note) {
    if (req.body.title) {
      note.title = req.body.title;
    }
    if (req.body.description) {
      note.description = req.body.description;
    }
    if (req.body.list) {
      note.list = req.body.list;
    }
    if (req.body.sticky !== null) {
      note.sticky = req.body.sticky;
    }
    if (req.body.color) {
      note.color = req.body.color;
    }
    if (req.body.isList !== note.isList) {
      note.isList = req.body.isList;
      if (note.isList) {
        if (!req.body.description) {
          req.body.description = '';
        }
        let arrayLista = req.body.description.split(/\r?\n/);
        note.list = [];
        for (let i = 0; i < arrayLista.length; i++) {
          note.list.push(
            {
              checked: false,
              value: arrayLista[i]
            });
        }
        note.description = '';
      } else {
        if (req.body.list.length) {
          note.description = req.body.list[0].value;
          for (let i = 1; i < req.body.list.length; i++) {
            note.description += '\n';
            note.description += req.body.list[i].value;
            console.log('VALOR - '+ req.body.list[i].value);
            console.log('LINAEA ' + i + ' - ' + note.description);
          }
          console.log('DESCRIPCION - ' + note.description);
        }
      }
    }

    note.save(function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(200).jsonp(note);
    });
  });
};

exports.deleteNote = function (req, res) {
  console.log('DELETE NOTE');
  console.log(req.params);
  Note.findById(req.params.id, function (err, note) {
    if (note) {
      note.remove(function (err) {
        if (err) {
          return res.status(500).send(err.message);
        }
        res.status(200).send();
      });
    } else {
      res.status(404).send();
    }
  });
};
