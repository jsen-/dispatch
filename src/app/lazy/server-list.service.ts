import { Injectable } from '@angular/core';

export class Server {

    constructor(private _id: number, private _name: string, private _package: ServerPackage) {
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    delete(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._package.delete_server(this);
        });
    }
}

export class ServerPackage {

    _servers: Set<Server> = new Set();

    constructor(private serverListService: ServerListService, private _id: number, private _name: string) {
    }

    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get servers() {
        return this._servers;
    }
    add_server(server_name: string) {
        this.servers.add(new Server(0, server_name, this));
    }
    delete_server(server: Server) {
        this._servers.delete(server);
    }
    async delete(): Promise<boolean> {
        const promises = [];
        this._servers.forEach(server => {
            promises.push(server.delete());
        });
        (await this.serverListService.getServerList()).delete(this);
        return true;
    }
}

@Injectable()
export class ServerListService {
    private server_packages: Set<ServerPackage> = undefined;

    async getServerList(): Promise<Set<ServerPackage>> {
        if (this.server_packages === undefined) {
            this.server_packages = await new Promise<Set<ServerPackage>>((resolve, reject) => {
                const server_packages = new Set();

                const server_package = new ServerPackage(this, 1, 'server1/server2');
                server_package.servers.add(new Server(1, 'server1.fqdn.com', server_package));
                server_package.servers.add(new Server(2, 'server2.fqdn.com', server_package));
                server_packages.add(server_package);

                resolve(server_packages);
            });
        }
        return this.server_packages;
    }
}
