const http = require('http');
const app = require('./app');
const WebSocket = require('ws');

class Clients {
    constructor() {
        this.clientList = {}
        this.saveClient = this.saveClient.bind(this);
    }
    saveClient(username, client) {
        this.clientList[username] = client;
    }
}
const clients = new Clients();


const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);

const ws = new WebSocket.Server({ server });

ws.on('connection', (client) => {

    //connection is up, let's add a simple simple event
    client.on('message', (message) => {

        console.log("Admin ID %s", message);


        let obj_ws = JSON.parse(message)
        console.log(obj_ws)
        clients.saveClient(obj_ws.id, client)

        console.log("Admin ID %s", message);
    });
});

module.exports.Clients = clients.clientList;
module.exports.ws = ws;
