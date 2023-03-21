var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var BokModel = require('../models/BokModel.js');

//req och res här är request- respektive response-objekten
router.get('/', function(req, res, next) {
//find är Mongoose funktion. err innehåller eventuellt fel, annars kommer resultatet att finnas i “bilarna”
BokModel.find(function (err, bockerna) {
if (err) return next(err);
else {
//Om det inte uppstår fel så skicka bilarna i jsonformat
res.json(bockerna);

}
});
});


//POST

router.post('/', function(req, res, next) {
  //req.body är innehållet i requestobjektet, dvs en json med en bil
  BokModel.create(req.body, function (err, post) {
  if (err) return next(err);
  res.json(post); //Här skickar vi tillbaka datan vi skickar in i databasen, om skrivningen gick bra
  });
  });


//DELETE

router.delete('/:id', function(req, res, next) {
  BokModel.findByIdAndRemove(req.params.id, req.body, function (err, post) {
  if (err) return next(err);
  res.json(post);
  });
  });



//Update

router.put('/:id', function(req, res, next) {
  BokModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
  if (err) return next(err);
  res.json(post);
  });
  });

module.exports = router;