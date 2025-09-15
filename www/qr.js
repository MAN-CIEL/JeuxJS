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

});