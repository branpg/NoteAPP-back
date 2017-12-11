let express = require('express');
let bodyParser  = require('body-parser');
let cors = require('cors');
let mongoose = require('mongoose');
let middleware = require('./services/middleware.service');
let ENV = require('./config/env');

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.set('port', 3000);

require('./models/note.model')(app, mongoose);
require('./models/tag.model')(app, mongoose);
require('./models/user.model')(app, mongoose);
let noteCtrl = require('./controllers/note.controller');
let authCtrl = require('./controllers/auth.controller');
let tagCtrl = require('./controllers/tag.controller');

let router = express.Router();

router.route('/note')
  .get(middleware.ensureAuthenticated, noteCtrl.getAllNotes)
  .post(middleware.ensureAuthenticated, noteCtrl.newNote);

router.route('/note/:id', middleware.ensureAuthenticated)
  .get(middleware.ensureAuthenticated, noteCtrl.getNote)
  .post(middleware.ensureAuthenticated, noteCtrl.updateNote)
  .delete(middleware.ensureAuthenticated, noteCtrl.deleteNote);

router.route('/signup')
  .post(authCtrl.signup);

router.route('/tags')
  .get(middleware.ensureAuthenticated, tagCtrl.getTags);

router.route('/getUserToken')
  .post(authCtrl.getUserToken);

app.use('/api', router);

// Start server
mongoose.connect(ENV.mongo.uri, function(err) {
  if(err) {
    throw err;
  }
  app.listen(3000, function() {
    console.log('Node server running on http://localhost:3000');
  });
});
