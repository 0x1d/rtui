'use strict'
var Rtorrent = require('node-rtorrent');
var schedule = require('node-schedule');

var FeedProcessor = require('./FeedProcessor.js');

module.exports = function(ctx) {

    var rtorrent = ctx.rtorrent || new Rtorrent(ctx.config.rTorrent);

    schedule.scheduleJob(ctx.config.rTorrent.checkFeedInterval, () => {
        for (let feed of ctx.config.rTorrent.feeds) {
            var feedProcessor = new FeedProcessor({
                feedUrl: feed.url,
                itemHandler: (item) => {
                    var feedItem = ctx.storage.getItemSync(item.title) || {};
                    if (feedItem.link) return;
                    feedItem = item;
                    ctx.storage.setItemSync(item.title, feedItem);
                    ctx.rtorrent.loadLink(item.link)
                        .then((data) => {
                            ctx.log.info('download started: ' + feedItem.title);
                        })
                        .catch(ctx.log.error);
                }
            });
        }

    });

};