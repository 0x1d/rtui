'use strict'
const qs = require('querystring');

var FeedApi = {
    feeds: (ctx) => {
        return ctx.storage.getItemSync('feeds');
    },
    downloaded: (ctx) => {
        return ctx.storage.getItemSync('downloaded');
    }
};

let FeedService = {

    resource: '/api(/:fun)',

    GET: function(ctx, http) {
        http.reply(
            FeedApi[http.data.fun](ctx)
        );
    },

    POST: function(ctx, http) { this.addFeed(ctx, http); },

    PUT: function(ctx, http) {
        this.addFeed(ctx, http);
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

module.exports = FeedService;