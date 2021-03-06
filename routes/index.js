var express = require('express');
var router = express.Router();
// var schema = require('../models/schema.js')

router.get('/', function (req, res) {
    res.render('index');
})

// back to index page
router.get('/index', function (req, res) {
    res.render('index');
})

// go to pressure-suggestion page from login
router.post('/submit', function (req, res, next) {
    res.render('pressure-suggestion');
});

// go to welcome page 
router.get('/welcome', function (req, res, next) {
    res.render('welcome');
});

// go to mass-measurement from welcome
router.get('/mass-measurement', function (req, res, next) {
    res.render('mass-measurement');
});

// go to pressure-unit from mass-measurement 
router.get('/pressure-unit', function (req, res, next) {
    res.render('pressure-unit');
});

// go to 
router.get('/riding-style', function (req, res, next) {
    res.render('riding-style');
});

router.get('/rider-weight', function (req, res, next) {
    res.render('rider-weight');
});

router.get('/tire-width', function (req, res, next) {
    res.render('tire-width');
});

router.get('/inner-rim-width', function (req, res, next) {
    res.render('inner-rim-width');
});

router.get('/wheel-diameter', function (req, res, next) {
    res.render('wheel-diameter');
});

router.get('/rim-type', function (req, res, next) {
    res.render('rim-type');
});

router.get('/road-surface', function (req, res, next) {
    res.render('road-surface');
});

router.get('/pressure-suggestion', function (req, res, next) {
    res.render('pressure-suggestion');
});

router.get('/about', function (req, res, next) {
    res.render('about');
});

router.get('/settings', function (req, res, next) {
    res.render('settings');
});

router.get('/register', function (req, res, next) {
    res.render('register');
});

router.get('/users/:id', function (req, res, next) {
    User.findById(req.params.id, function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});


module.exports = router;

