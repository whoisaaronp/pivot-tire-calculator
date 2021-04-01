var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

// intailizing mongo at the start …
mongoose.connect('mongodb+srv://apaterson:Fq3FIdFYIuICGyj7@capstone.5wnns.mongodb.net/tirecalculatorDB?retryWrites=true&w=majority', function (err) {
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
module.exports = router;

// made a new router to receive data and save to the DB
router.post('/add_input', function(req, res) {
  mongoose.connection.db.collection('users').insertOne(req.body);
  res.send(JSON.stringify({
    status: 'success'
  }));
});