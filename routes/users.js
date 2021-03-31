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
    console.log('connected');
  }
});

// call back function name, query, call back… to hold to data 
function find(name, query, cb) {
  mongoose.connection.db.collection(name, function (err, collection) {
    collection.find(query).toArray(cb);
  });
}

/* GET users listing. */
// BACKEND
// Received documents as an argument and sends to the browser…
router.get('/', function (req, res, next) {
  find('users', '', (err, docs) => {
    res.send(JSON.stringify(docs));
  });
});
module.exports = router;

// FRONTEND
// const users = db.get('users').then((docs) => {

// });


// nodejs writing into mongoose using localstorage 
//transfer data in to mongoBD using steps 1 code*
// 1. pull from localstorage using 'getitem'
// 2. turn the key string into a json object in a single variable hten monogodb insert

// let theUser = localStorage.getItem('user'),
// let pressureUnit = localStorage.getItem('pressure-unit'),
// let massUnit = localStorage.getItem('weight-unit'),
// let riderStyle = localStorage.getItem('bike'),
// let humanWeight = localStorage.getItem('rider-weight'),
// let rimWidth = localStorage.getItem('rim-width'),
// let rimType = localStorage.getItem('rim-type'),
// let roadSurface = localStorage.getItem('road-surface'),
// let wheelDiameter = localStorage.getItem('wheel-diameter'),
// let frontPressure = localStorage.getItem('front_pressure'),
// let rearPressure = localStorage.getItem('rear_pressure')

// put everything in a json object concatitnate
// let storeLocal = "{user:" + theUser + ",pressure-unit:" + pressureUnit + ",weight-unit:" + massUnit + ",bike:" + riderStyle + ",rider-weight:" + humanWeight + ",rim-width:" + rimWidth + ",rim-type:" + rimType + ", road-surface:" + roadSurface + ", wheel-diameter:" + wheelDiameter + ", front_pressure:" + frontPressure + ",rear_pressure:" + rearPressure + "}";

// the send it
// Mongoosemodel.insertOne(storeLocal);