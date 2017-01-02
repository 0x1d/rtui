const server = require('slimple');
const RTorrent = require('./src/lib/RTorrent.js');
const serverConfig = require('./config/server.js');
const rTorrentConfig = require('./config/rtorrent.js')

server.run(serverConfig, {
    rtorrent: new RTorrent(rTorrentConfig)
});
