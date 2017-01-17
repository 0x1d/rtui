const qs = require('querystring');

module.exports = rTorrentService = {

    resource: '/api',

    GET: function(ctx, http) { this.rTorrentApiCall(ctx, http) },

    POST: function(ctx, http) { this.rTorrentApiCall(ctx, http) },

    PUT: function(ctx, http) {
        ctx.rtorrent.loadLink(http.data.torrentLink)
            .then(http.reply)
            .catch(this.throwError);
    },

    rTorrentApiCall: function(ctx, http) {
      try {
        ctx.rtorrent[http.data.action](http.data)
          .then(http.reply)
          .catch(this.throwError);
      } catch (error) {
        ctx.log.error(error);
      }
    },

    throwError: function(error) {
        throw {
            status: 500,
            error: error
        };
    }

};
