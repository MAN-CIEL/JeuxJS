/* var ipServeur = location.hostname;
var ws;
window.onload = function () {
    if (TesterLaCompatibilite()) {
        ConnexionAuServeurWebsocket();
    }
    ControleIHM();
}
function TesterLaCompatibilite() {
    let estCompatible = true;
    if (!('WebSocket' in window)) { window.alert('WebSocket non supporté'); estCompatible = false; }
    return estCompatible;
}
function ConnexionAuServeurWebsocket() {
    ws = new WebSocket('ws://' + ipServeur + '/echo');
    ws.onclose = function (evt) { window.alert('WebSocket close'); };
    ws.onopen = function () { console.log('WebSocket open'); };
    ws.onmessage = function (evt) { document.getElementById('messageRecu').value = evt.data; };
}
function ControleIHM() { document.getElementById('Envoyer').onclick = BPEnvoyer; }
function BPEnvoyer() { ws.send(document.getElementById('messageEnvoi').value); } 

exp.ws('/echo', function (ws, req) {
    console.log('Connection WebSocket %s sur le port %s',
        req.connection.remoteAddress,
        req.connection.remotePort);

    ws.on('message', function (message) {
        // Ajouter l’adresse et port du client au message diffusé
        message = ws._socket._peername.address + ws._socket._peername.port + ' : ' + message;
        // Diffuser le message à tous les clients connectés
        aWss.broadcast(message);
    });

    ws.on('close', function (reasonCode, description) {
        console.log('Deconnexion WebSocket %s sur le port %s',
            req.connection.remoteAddress,
            req.connection.remotePort);
    });
}); */