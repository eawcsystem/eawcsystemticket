document.getElementById('ticketForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('ticketTitle').value;
    const description = document.getElementById('ticketDescription').value;

    // Neues Ticket an das Backend senden
    fetch('http://localhost:5000/tickets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
    })
    .then(response => response.json())
    .then(data => {
        // Formular zurücksetzen und Tickets neu laden
        document.getElementById('ticketForm').reset();
        loadTickets();
    })
    .catch(error => console.error('Fehler:', error));
});

// Funktion zum Abrufen der Tickets vom Backend
function loadTickets() {
    fetch('http://localhost:5000/tickets')
        .then(response => response.json())
        .then(data => {
            tickets.length = 0;
            data.forEach(ticket => tickets.push(ticket));
            displayTickets();
        })
        .catch(error => console.error('Fehler:', error));
}

// Initiale Ticket-Daten laden
loadTickets();
