'use strict';

var express = require('express');
var expressWs = require('express-ws');
var exp = express();
expressWs(exp);

var CQr = require('./jeuxqr.js');
var jeuxQr = new CQr();

exp.use(express.static(__dirname + '/www'));

exp.get('/', function (req, res) {
    res.sendFile(__dirname + '/www/index.html');
});

// WebSocket pour le quiz questions/réponses
exp.ws('/qr', function (ws, req) {
    console.log('Connexion WebSocket %s sur le port %s',
        req.connection.remoteAddress,
        req.connection.remotePort);

    jeuxQr.NouvelleQuestion();

    ws.on('message', function (message) {
        jeuxQr.TraiterReponse(ws, message);
    });

    ws.on('close', function () {
        jeuxQr.Deconnecter(ws);
        console.log('Déconnexion WebSocket %s sur le port %s',
            req.connection.remoteAddress,
            req.connection.remotePort);
    });
});

// Serveur écoute sur port 80 (ou autre)
var portServ = 80;
exp.listen(portServ, function () {
    console.log('Serveur en écoute sur le port ' + portServ);
});