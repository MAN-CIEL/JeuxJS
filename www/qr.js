var ipServeur = location.hostname;
var ws;

window.onload = function () {
    if ('WebSocket' in window) {
        ConnexionAuServeurWebsocket();
    } else {
        alert('WebSocket non supporté par le navigateur');
    }
    ControleIHM();
};

function ConnexionAuServeurWebsocket() {
    ws = new WebSocket('ws://' + ipServeur + '/qr');

    ws.onopen = function () {
        console.log('WebSocket ouverte');
    };

    ws.onclose = function () {
        alert('Connexion WebSocket fermée');
    };

    ws.onmessage = function (evt) {
        var mess = JSON.parse(evt.data);
        document.getElementById('question').textContent = mess.question;
        document.getElementById('resultats').textContent = JSON.stringify(mess.joueurs, null, 2);
    };
}

function ControleIHM() {
    document.getElementById('Valider').onclick = BPValider;
}

function BPValider() {
    var nom = document.getElementById('nom').value.trim();
    var reponse = document.getElementById('reponse').value.trim();

    if (nom === '') {
        alert('Veuillez saisir votre nom');
        return;
    }
    if (reponse === '') {
        alert('Veuillez saisir une réponse');
        return;
    }

    var message = JSON.stringify({ nom: nom, reponse: reponse });
    ws.send(message);

    document.getElementById('reponse').value = '';
}