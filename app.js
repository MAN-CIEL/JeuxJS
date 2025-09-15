'use strict';
var express = require('express');
var exp = express();
exp.use(express.static(__dirname + '/www'));
exp.get('/', function (req, res) {
    console.log("R�ponse � un client");
    res.sendFile(__dirname + '/www/textchat.html');
});
exp.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Erreur serveur express');
});
var port = 80;

var expressWs = require('express-ws')(exp);
exp.ws('/echo', function (ws, req) {
    console.log('Connection WebSocket %s sur le port %s', req.connection.remoteAddress, req.connection.remotePort);
    ws.on('message', function (message) {
        console.log('De %s %s, message :%s', req.connection.remoteAddress, req.connection.remotePort, message);
        ws.send(message);
    });
    ws.on('close', function (reasonCode, description) {
        console.log('Deconnexion WebSocket %s sur le port %s', req.connection.remoteAddress, req.connection.remotePort);
    });
});

/*  ****************** Broadcast clients WebSocket  **************   */
var aWss = expressWs.getWss('/echo'); 
var WebSocket = require('ws');
aWss.broadcast = function broadcast(data) {
    console.log("Broadcast aux clients navigateur : %s", data);
    aWss.clients.forEach(function each(client) {
        if (client.readyState == WebSocket.OPEN) {
            client.send(data, function ack(error) {
                console.log("    -  %s-%s", client._socket.remoteAddress,
                    client._socket.remotePort);
                if (error) {
                    console.log('ERREUR websocket broadcast : %s', error.toString());
                }
            });
        }
    });
}; 

var Cjeuxqr = require('./jeuxqr.js');
var jeuxQr = new Cjeuxqr();

exp.listen(port, function () { console.log('Serveur en ecoute'); });