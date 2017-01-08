"use strict";

const RTorrentClient = require('node-rtorrent');

class RTorrent {

    constructor(config) {
        this.client = new RTorrentClient(config);
    }

    loadLink(link) {
        var _this = this;
        return new Promise((fulfill, reject) => {
            _this.client.loadLink(link, (error, data) => {
                if(error) reject(error);
                else {
                    fulfill(data || {});
                }
            });
        });
    }

    getAll() {
        var _this = this;
        return new Promise((fulfill, reject) => {
            _this.client.getAll((error, data) => {
                if(error) reject(error);
                else {
                    fulfill(data);
                }
            });
        });
    }

    getDownloadList() {
        var _this = this;
        return new Promise((fulfill, reject) => {
            _this.client.get('download_list', [], (error, hashes) => {
                if(error) reject(error);
                else {
                    fulfill(hashes);
                }
            });
        });
    }

    getTorrentInfo(hash) {
        var _this = this;
        return new Promise((fulfill, reject) => {
            _this.client.get('d.name', [hash], function (error, data) {
                if (error) reject(error);
                else {
                    fulfill(data);
                }
            });
        });
    }

}

module.exports = RTorrent;
