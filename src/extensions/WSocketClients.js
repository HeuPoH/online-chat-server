class WSocketClients {
    constructor() {
        this.clients = new Set();
    }
    
    static create() {
        return new WSocketClients();
    }

    push(client) {
        this.clients.add(client);
    }

    delete(client) {
        this.clients.delete(client);
    }

    get size() {
        return this.clients.size;
    }

    getClients() {
        return this.clients;
    }
}

module.exports = WSocketClients;