const qs = require('querystring');

module.exports = rTorrentService = {

    resource: '/api',

    GET: (ctx, http) => {
        ctx.rtorrent.getAll()
            .then(http.reply)
            .catch(this.throwError);
    },

    PUT: (ctx, http) => {
        ctx.rtorrent.loadLink(http.data.torrentLink)
            .then(http.reply)
            .catch(this.throwError);
    },

    throwError: (error) => {
        throw {
            status: 500,
            error: error
        };
    }

};
