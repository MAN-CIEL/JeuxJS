class CQr {
    constructor() {
        this.question = '?';
        this.bonneReponse = 0;
    }
    GetRandomInt(max) { return Math.floor(Math.random() * Math.floor(max)); }
    NouvelleQuestion() { ... }
    TraiterReponse(wsClient, message) { ... }

    this.joueurs = new Array();
    // Au message reçu :
    var indexjoueur = this.joueurs.findIndex(j => j.nom === mess.nom);
    if (indexjoueur == -1) {
        this.joueurs.push({ nom: mess.nom, score: 0, ws: wsClient });
    }
    // Incrémenter score si bonne réponse, envoyer résultats avec tous les joueurs :
    EnvoyerResultatDiff() {
        var joueursSimple = this.joueurs.map(joueur => ({ nom: joueur.nom, score: joueur.score }));
        var message = { joueurs: joueursSimple, question: this.question };
        this.joueurs.forEach(joueur => { if (joueur.ws) joueur.ws.send(JSON.stringify(message)); });
    }
}
var jeuxQr = new CQr();

ws.on('message', jeuxQr.TraiterReponse.bind(jeuxQr));

var question = '?';
var bonneReponse = 0;

// Connexion des clients a la WebSocket /qr et evenements associés 
// Questions/reponses 
exp.ws('/qr', function (ws, req) {
    console.log('Connection WebSocket %s sur le port %s',
        req.connection.remoteAddress, req.connection.remotePort);
    NouvelleQuestion();

    ws.on('message', TraiterReponse);

    ws.on('close', function (reasonCode, description) {
        console.log('Deconnexion WebSocket %s sur le port %s',
            req.connection.remoteAddress, req.connection.remotePort);
    });


    function TraiterReponse(message) {
        console.log('De %s %s, message :%s', req.connection.remoteAddress,
            req.connection.remotePort, message);
        if (message == bonneReponse) {
            NouvelleQuestion();
        }
    }


    function NouvelleQuestion() {
        var x = GetRandomInt(11);
        var y = GetRandomInt(11);
        question = x + '*' + y + ' =  ?';
        bonneReponse = x * y;
        aWss.broadcast(question);
    }

    function GetRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function TraiterReponse(wsClient, message) {
        var mess = JSON.parse(message);
        // ... gestion du joueur ...

        if (mess.reponse == this.bonneReponse) {
            // Envoyer "Bonne réponse !" au joueur ayant répondu
            wsClient.send(JSON.stringify({ question: "Bonne réponse !" }));
            // Après 3 secondes, envoyer une nouvelle question à tous
            setTimeout(() => {
                this.NouvelleQuestion();
            }, 3000);
        } else {
            // Envoyer "Mauvaise réponse" uniquement au joueur
            wsClient.send(JSON.stringify({ question: "Mauvaise réponse" }));
            // Après 3 secondes, redisplay la question (ou nouvelle question selon règles)
            setTimeout(() => {
                wsClient.send(JSON.stringify({ question: this.question }));
            }, 3000);
        }
    }

    function NouvelleQuestion() {
        // Générer un entier aléatoire en base 10 (ex : entre 0 et 255)
        var value = this.GetRandomInt(256);
        // Générer la chaîne binaire (ex : '11001001')
        var binaryStr = value.toString(2).padStart(8, '0');
        // Afficher la question sous forme de conversion base 2 -> base 10
        this.question = "Convertir en décimal : " + binaryStr;
        // Stocker la bonne réponse en base 10
        this.bonneReponse = value;
        // Diffuser la question à tous les joueurs
        this.EnvoyerResultatDiff();
    }
});

ws.send(JSON.stringify({ nom: document.getElementById('nom').value, reponse: document.getElementById('messageEnvoi').value }));

var mess = JSON.parse(message);

document.getElementById('resultats').textContent = JSON.stringify(mess.joueurs);

ws.on('close', function (...) { jeuxQr.Deconnecter(ws); });
if (indexjoueur == -1) { ... } else { /* Actualiser ws ou refuser */ }
