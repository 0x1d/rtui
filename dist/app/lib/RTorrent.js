"use strict";

const RTorrentClient = require('node-rtorrent');

class RTorrent {

    constructor(config) {
        this.client = new RTorrentClient(config);
    }

    loadLink(link) {
        return new Promise((fulfill, reject) => {
            this.client.loadLink(link, (error, data) => {
                if(error) reject(error);
                else {
                    fulfill(data || {});
                }
            });
        });
    }

    getAll() {
        return new Promise((fulfill, reject) => {
            this.client.getAll((error, data) => {
                if(error) reject(error);
                else {
                    fulfill(data);
                }
            });
        });
    }

    getDownloadList() {
        return new Promise((fulfill, reject) => {
            this.client.get('download_list', [], (error, hashes) => {
                if(error) reject(error);
                else {
                    fulfill(hashes);
                }
            });
        });
    }

    getTorrentInfo(hash) {
        return new Promise((fulfill, reject) => {
            this.client.get('d.name', [hash], function (error, data) {
                if (error) reject(error);
                else {
                    fulfill(data);
                }
            });
        });
    }

    multicall(input) {
        return new Promise((fulfill, reject) => {
            this.client.get(input.call, [], function (error, data) {
                if (error) reject(error);
                else {
                    fulfill(data);
                }
            });
        });
    }

}

module.exports = RTorrent;
