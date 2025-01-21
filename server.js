const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// Dummy-Daten für Benutzer und Tickets
const users = {
    'test23': { pin: '1234', role: 'admin' },  // Admin
    'supportUser': { pin: '5678', role: 'support' }  // Support-Mitglied
};

let tickets = [];

// Login-Endpoint
app.post('/login', (req, res) => {
    const { username, pin } = req.body;
    const user = users[username];

    if (user && user.pin === pin) {
        res.json({ success: true, role: user.role });
    } else {
        res.json({ success: false });
    }
});

// Ticket-Management-Endpunkte
app.post('/tickets', (req, res) => {
    const { title, description, role } = req.body;
    const newTicket = { id: tickets.length + 1, title, description, role };
    tickets.push(newTicket);
    res.json(newTicket);
});

app.get('/tickets', (req, res) => {
    res.json(tickets);
});

app.put('/tickets/:id', (req, res) => {
    const ticketId = parseInt(req.params.id);
    const { title, description } = req.body;
    const ticket = tickets.find(ticket => ticket.id === ticketId);

    if (ticket) {
        ticket.title = title;
        ticket.description = description;
        res.json(ticket);
    } else {
        res.status(404).json({ message: 'Ticket nicht gefunden' });
    }
});

app.delete('/tickets/:id', (req, res) => {
    const ticketId = parseInt(req.params.id);
    tickets = tickets.filter(ticket => ticket.id !== ticketId);
    res.json({ success: true });
});

app.delete('/tickets', (req, res) => {
    tickets = [];
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
