const qs = require('querystring');

module.exports = {
    
    resource: '/api',

    GET: (ctx, http) => {
        ctx.rtorrent.getAll()
            .then(http.reply)
            .catch(this.throwError);
    },

    POST: (ctx, http) => {
        ctx.rtorrent.loadLink(qs.parse(http.data).torrentLink)
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
