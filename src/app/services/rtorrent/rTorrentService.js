const qs = require('querystring');

module.exports = rTorrentService = {

    resource: '/api',

    GET: function(ctx, http) {
      try {
        ctx.rtorrent[http.data.action](http.data)
          .then(http.reply)
          .catch(this.throwError);
      } catch (error) {
        console.log(error);
      }

    },

    PUT: function(ctx, http) {
        ctx.rtorrent.loadLink(http.data.torrentLink)
            .then(http.reply)
            .catch(this.throwError);
    },

    throwError: function(error) {
        throw {
            status: 500,
            error: error
        };
    }

};
