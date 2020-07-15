const server = {
    port_server : process.env.port_server
}

const bd = {
    db_port : process.env.db_port,
    db_host : process.env.db_host,
    db_name : process.env.db_name
}

module.exports = {
    server,
    bd
}
