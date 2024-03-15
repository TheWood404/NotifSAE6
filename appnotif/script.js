function getNotification() {
    fetch('http://localhost:3000/read-notification')
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            const notificationDiv = document.getElementById('notification');
            notificationDiv.style.display = 'block';
            notificationDiv.innerHTML = `<strong>Notification:</strong> ${data.message}`;
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des notifications :', error);
    });
}

setInterval(getNotification, 5000);
