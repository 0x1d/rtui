const qs = require('querystring');

module.exports = rTorrentService = {

    resource: '/api',

    GET: (ctx, http) => {
        ctx.rtorrent.getAll()
            .then(http.reply)
            .catch(this.throwError);
    },

    POST: (ctx, http) => {
        var torrentLink = qs.parse(http.data).torrentLink;
        ctx.rtorrent.loadLink(torrentLink)
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
