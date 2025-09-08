'use strict';
var express = require('express');
var exp = express();
exp.use(express.static(__dirname + '/www'));
exp.get('/', function (req, res) {
    console.log("Réponse à un client");
    res.sendFile(__dirname + '/www/index.html');
});
exp.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Erreur serveur express');
});
var port = 80;
exp.listen(port, function () { console.log('Serveur en écoute'); });