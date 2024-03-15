const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const fs = require('fs');
const path = require('path');

app.use(cors());

const notificationFilePath = path.join(__dirname, 'notification.json');

if (fs.existsSync(notificationFilePath)) {
    fs.unlinkSync(notificationFilePath);
}

fs.writeFileSync(notificationFilePath, JSON.stringify({}));

app.get('/send-notification', (req, res) => {
    const message = req.query.message;

    const notificationData = { message: message };

    const notificationJSON = JSON.stringify(notificationData);

    const notificationFilePath = path.join(__dirname, 'notification.json');

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

app.get('/read-notification', (req, res) => {
    const notificationFilePath = path.join(__dirname, 'notification.json');

    fs.readFile(notificationFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture de la notification depuis le fichier:', err);
            res.status(500).send('Erreur lors de la lecture de la notification depuis le fichier');
        } else {
            console.log('Notification lue depuis le fichier:', data);
            res.status(200).send(data);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
}
);