// Fonction pour récupérer les notifications du serveur
function getNotification() {
    // Appel à l'API pour récupérer les notifications
    fetch('http://localhost:3000/read-notification')
    .then(response => response.json())
    .then(data => {
        // Vérifie si une notification doit être affichée
        if (data.message) {
            // Affiche la notification
            const notificationDiv = document.getElementById('notification');
            notificationDiv.style.display = 'block';
            notificationDiv.innerHTML = `<strong>Notification:</strong> ${data.message}`;
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des notifications :', error);
    });
}

// Vérification des notifications toutes les 5 secondes
setInterval(getNotification, 5000);
