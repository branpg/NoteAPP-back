let mongoose = require('mongoose');
let Note  = mongoose.model('Note');

exports.getAllNotes = function(req, res) {
  console.log('GET ALL NOTES');
  console.log(req.query);
  console.log(req.params);
  Note.find(function(err, notes) {
    if(err) {
      res.send(500, err.message);
    }
    res.status(200).jsonp(notes);
  });
};

exports.getNote = function(req, res) {
  console.log('GET NOTE');
  console.log(req.query);
  console.log(req.params);
  Note.findById(req.params.id, function(err, tvshow) {
    if(err) {
      return res.send(500, err.message);
    }

    console.log('GET /note/' + req.params.id);
    res.status(200).jsonp(tvshow);
  });
};

exports.newNote = function(req, res) {
  console.log('NEW NOTE');
  console.log(req.body);
  let source = {};
  if(req.body.title) {
    source.title = req.body.title;
  }
  if(req.body.description) {
    source.description = req.body.description;
  }
  if(req.body.list) {
    source.list = req.body.list;
  }

  let note = new Note(source);

  note.save(function(err, note) {
    if(err) {
      return res.status(500).send( err.message);
    }
    res.status(200).jsonp(note);
  });
};

exports.updateNote = function(req, res) {
  console.log('UPDATE NOTE');
  console.log(req.params);
  console.log(req.body);
  Note.findById(req.params.id, function(err, note) {
    if(req.body.title) {
      note.title = req.body.title;
    }
    if(req.body.description) {
      note.description = req.body.description;
    }
    if(req.body.list) {
      note.list = req.body.list;
    }

    note.save(function(err) {
      if(err) {
        return res.status(500).send(err.message);
      }
      res.status(200).jsonp(note);
    });
  });
};

exports.deleteNote = function(req, res) {
  console.log('DELETE NOTE');
  console.log(req.params);
  Note.findById(req.params.id, function(err, note) {
    if(note) {
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
