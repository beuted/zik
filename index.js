const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// server routes
const api = require('./server/routes/api');

// initialize an express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const server = http.createServer(app);

const port = process.env.PORT || '3000';
app.set('port', port);

server.listen(port, () => console.log(`API running on localhost:${port}`));
