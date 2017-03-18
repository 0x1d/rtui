'use strict'
const qs = require('querystring');

var FeedApi = {
    feeds: (ctx) => {
        return ctx.storage.getItemSync('feeds');
    },
    downloaded: (ctx) => {
        return ctx.storage.getItemSync('downloaded');
    },
    addFeed: (ctx, http) => {
        let feeds = ctx.storage.getItemSync('feeds') || {};
        feeds[http.data.feedKey] = http.data.feedUrl;
        ctx.storage.setItemSync('feeds', feeds);
    }
};

let FeedService = {

    resource: '/api(/:fun)',

    GET: function(ctx, http) {
        http.reply(
            FeedApi[http.data.fun](ctx)
        );
    },

    PUT: function(ctx, http) {
        console.log(qs.parse(http.data));
        FeedApi.addFeed(ctx, http);
        http.reply({});
    },

    POST: function(ctx, http) {
        console.log(http.data);
        FeedApi.addFeed(ctx, http);
        http.reply({});
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