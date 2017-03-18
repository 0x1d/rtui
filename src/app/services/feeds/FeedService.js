const qs = require('querystring');

module.exports = FeedService = {

    resource: '/api',

    GET: function(ctx, http) { this.getFeeds(ctx, http); },

    POST: function(ctx, http) { this.addFeed(ctx, http); },

    PUT: function(ctx, http) {
        this.addFeed(ctx, http);
    },

    getFeeds: function(ctx, http) {
        /*ctx.storage.init().then(function() {
            ctx.storage.getItem('feeds').then(http.reply);
        });*/
        http.reply(ctx.storage.getItemSync('feeds'));
    },

    addFeed: function(ctx, http) {
        /*ctx.storage.init().then(function() {
            ctx.storage.setItem(http.data.itemKey, http.data.item).then(function() {
                http.reply({});
            }).catch(throwError);
        });*/
    },

    throwError: function(error) {
        throw {
            status: 500,
            error: error
        };
    }

};