const express = require('express');
const cors = require('cors'); // Importez le module cors
const app = express();
const PORT = 3000;
const fs = require('fs');
const path = require('path');

// Activez CORS
app.use(cors());


// Point de terminaison API pour vérifier si une notification doit être envoyée
app.get('/send-notification', (req, res) => {
    // Récupérer les paramètres de la requête
    const message = req.query.message;

    // Construire l'objet JSON avec la notification
    const notificationData = { message: message };

    // Convertir l'objet JSON en chaîne JSON
    const notificationJSON = JSON.stringify(notificationData);

    // Chemin du fichier de notification JSON
    const notificationFilePath = path.join(__dirname, 'notification.json');

    // Écrire la notification JSON dans le fichier
    fs.writeFile(notificationFilePath, notificationJSON, (err) => {
        if (err) {
            console.error('Erreur lors de l\'écriture de la notification dans le fichier:', err);
            res.status(500).json({ success: false, error: 'Erreur lors de l\'écriture de la notification dans le fichier' });
        } else {
            console.log('Notification écrite dans le fichier:', notificationJSON);
            res.status(200).json({ success: true });
        }
    });
});

// Point de terminaison API pour lire la notification depuis le fichier temporaire
app.get('/read-notification', (req, res) => {
    const notificationFilePath = path.join(__dirname, 'notification.json');

    // Lire la notification à partir du fichier temporaire
    fs.readFile(notificationFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture de la notification depuis le fichier:', err);
            res.status(500).send('Erreur lors de la lecture de la notification depuis le fichier');
        } else {
            console.log('Notification lue depuis le fichier:', data);
            res.status(200).send(data); // Envoyer le contenu du fichier comme réponse
        }
    });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
}
);