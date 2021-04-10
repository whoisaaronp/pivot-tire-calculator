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

// Making a call to ONLY a specific _ID
// pull out every thign then specify later on
// 1. Route to connect only to 'rider weight' and 'tire width'
// 2. Create route file then use the user id ad 'user' then specific what to show in the chart.

router.get('/user/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, user) {
     if (err) return next(err);
    res.json(user);
   });
 });

 // user has to make a unique name from the start else error!