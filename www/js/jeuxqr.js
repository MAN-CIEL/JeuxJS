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

Deconnecter(ws) {
    var indexjoueur = this.joueurs.findIndex(j => j.ws === ws);
    if (indexjoueur != -1) { this.joueurs[indexjoueur].ws = undefined; }
}

}

module.exports = CQr;