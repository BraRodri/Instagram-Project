require('dotenv').config();

const { server, bd } = require('./config');
const { ConnectionWithMongoDB } = require('./Database');
const app = require('./app');

ConnectionWithMongoDB(bd);

app.listen(server.port_server, () => {
    console.log(`server listening on port ${server.port_server}`);
});