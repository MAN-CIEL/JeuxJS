'use strict';

class CQr {
    constructor() {
        this.question = '?';
        this.bonneReponse = 0;
        this.joueurs = [];
    }

    GetRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    NouvelleQuestion() {
        // Exemple question multiplication
        var x = this.GetRandomInt(11);
        var y = this.GetRandomInt(11);
        this.question = `${x} * ${y} = ?`;
        this.bonneReponse = x * y;

        // Exemple question conversion binaire base 2 vers 10 (décommenter pour tester)
        /*
                var value = this.GetRandomInt(256);
                var binaryStr = value.toString(2).padStart(8, '0');
                this.question = `Convertir en décimal : ${binaryStr}`;
                this.bonneReponse = value;
        */

        this.EnvoyerResultatDiff();
    }

    TraiterReponse(wsClient, message) {
        let mess;
        try {
            mess = JSON.parse(message);
        } catch (e) {
            console.log("Message non JSON reçu : " + message);
            return;
        }

        let indexjoueur = this.joueurs.findIndex(j => j.nom === mess.nom);
        if (indexjoueur === -1) {
            this.joueurs.push({ nom: mess.nom, score: 0, ws: wsClient });
            indexjoueur = this.joueurs.length - 1;
        } else {
            this.joueurs[indexjoueur].ws = wsClient; // Mise à jour ws en cas de reconnexion
        }

        if (mess.reponse == this.bonneReponse) {
            this.joueurs[indexjoueur].score++;
            wsClient.send(JSON.stringify({ question: "Bonne réponse !" }));
            this.question = `Bonne réponse de ${mess.nom}`;
            this.EnvoyerResultatDiff();

            setTimeout(() => {
                this.NouvelleQuestion();
            }, 3000);

        } else {
            wsClient.send(JSON.stringify({ question: "Mauvaise réponse" }));

            setTimeout(() => {
                wsClient.send(JSON.stringify({ question: this.question }));
            }, 3000);
        }
    }

    EnvoyerResultatDiff() {
        let joueursSimple = this.joueurs.map(j => ({
            nom: j.nom,
            score: j.score,
            connected: (j.ws !== undefined)
        }));

        var messagePourLesClients = {
            joueurs: joueursSimple,
            question: this.question
        };

        this.joueurs.forEach(joueur => {
            if (joueur.ws !== undefined) {
                joueur.ws.send(JSON.stringify(messagePourLesClients), function ack(error) {
                    if (error) {
                        console.log('ERREUR websocket broadcast : ' + error.toString());
                    }
                });
            }
        });
    }

    Deconnecter(ws) {
        let indexjoueur = this.joueurs.findIndex(j => j.ws === ws);
        if (indexjoueur !== -1) {
            this.joueurs[indexjoueur].ws = undefined;
        }
    }
}

module.exports = CQr;