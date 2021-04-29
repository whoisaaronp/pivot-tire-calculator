var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

// intailizing mongo at the start …
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_ADDRESS}`, function (err) {
  if (err) {
    console.log('error connecting', err);
  } else {
    console.log('Pivot App connected');
  }
});

// call back function name, query, call back… to hold to data 
function find(name, query, cb) {
  mongoose.connection.db.collection(name, function (err, collection) {
    collection.find(query).toArray(cb);
  });
}

// BACKEND
// Received documents as an argument and sends to the browser…
router.get('/', function (req, res, next) {
  find('users', '', (err, docs) => {
    res.send(JSON.stringify(docs));
  });
});

// made a new router to receive data and save to the DB
router.post('/add_input', function(req, res) {
  mongoose.connection.db.collection('users').insertOne(req.body);
  res.send(JSON.stringify({
    status: 'success'
  }));
});

router.post('/register_user', function(req, res) {

  // res.send(JSON.stringify({
  //   body: req.body
  // }));

  // return;


  // Searching by req.body.name
  // Check for existing user by user name
  mongoose.connection.db.collection('user_data').findOne({ name: req.body.name })
    .then((user) => {
      // Register user if one doesn't exist
      if (user === null) {
        mongoose.connection.db.collection('user_data').insertOne(req.body);
        res.send(JSON.stringify({
          status: 'user_created',
          user: req.body
        }));
      }
      // If one does exist, send an error
      else {
        res.send(JSON.stringify({
          status: 'error_exists'
        }));
      }
    });
});

router.post('/login_user', function(req, res) {

  // Check if record exists w/ name and password
  mongoose.connection.db.collection('user_data').findOne({ name: req.body.name, password: req.body.password })
    .then((user) => {
      // If it does, send back the ID
      if (user !== null) {
        res.send({
          status: 'success',
          user: user
        });
      }
      // Otherwise, send an error
      else {
        res.send({
          status: 'error'
        });
      }
    });
});

router.post('/get_user_chart', function(req, res) {


  var action = function (err, collection) {
      // Locate all the entries using find
      collection.find({'userID': req.body.userID }).sort({'rider-weight': -1}).toArray(function(err, results) {
          res.send({
            status: 'success',
            data: results
          });
      });
  };

  mongoose.connection.db.collection('users', action);

  
});
router.get('/user/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, user) {
     if (err) return next(err);
    res.json(user);
   });
 });

module.exports = router;
