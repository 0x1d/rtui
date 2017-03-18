'use strict'

const server = require('slimple');
const RTorrent = require('./lib/RTorrent.js');
const Feedy = require('./lib/Feedy.js');
const storage = require('node-persist');
const serverConfig = require('../../config/server.js');
const rTorrentConfig = require('../../config/rtorrent.js');

storage.initSync();

serverConfig.rTorrent = rTorrentConfig;

let ctx = server.run(serverConfig, {
    storage: storage
});

ctx.rtorrent = new RTorrent(rTorrentConfig);
ctx.feedy = new Feedy(ctx);