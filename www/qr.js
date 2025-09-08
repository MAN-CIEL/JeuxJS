var ipServeur = location.hostname;  // Adresse IP ou nom du serveur
var ws;                             // WebSocket client

window.onload = function () {
    if ('WebSocket' in window) {
        ConnexionAuServeurWebsocket();
    } else {
        alert('WebSocket non support� par le navigateur');
    }
    ControleIHM();
};

// Fonction pour ouvrir la connexion WebSocket
function ConnexionAuServeurWebsocket() {
    ws = new WebSocket('ws://' + ipServeur + '/qr');

    ws.onopen = function () {
        console.log('WebSocket ouverte');
    };

    ws.onclose = function () {
        alert('Connexion WebSocket ferm�e');
    };

    ws.onmessage = function (evt) {
        var mess = JSON.parse(evt.data);
        document.getElementById('question').textContent = mess.question;
        document.getElementById('resultats').textContent = JSON.stringify(mess.joueurs, null, 2);
    };
}

// G�rer le clic sur le bouton Valider
function ControleIHM() {
    document.getElementById('Valider').onclick = BPValider;
}

// Envoyer la r�ponse du joueur au serveur
function BPValider() {
    var nom = document.getElementById('nom').value.trim();
    var reponse = document.getElementById('reponse').value.trim();

    if (nom === '') {
        alert('Veuillez saisir votre nom');
        return;
    }

    if (reponse === '') {
        alert('Veuillez saisir une r�ponse');
        return;
    }

    var message = JSON.stringify({ nom: nom, reponse: reponse });
    ws.send(message);

    document.getElementById('reponse').value = '';  // Effacer le champ r�ponse
}
