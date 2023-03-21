var mongoose = require('mongoose');

var BokSchema = new mongoose.Schema({
title: String,
author: String,
//här har jag valt, i brist på annat, int32 istället för number, i Mongo DB, är det ett problem?
pages: Number,
read: Boolean
},
{
collection: 'bocker'
});

module.exports = mongoose.model('BokModel', BokSchema);
