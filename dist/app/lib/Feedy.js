'use strict'
var Rtorrent = require('node-rtorrent');
var schedule = require('node-schedule');

var FeedProcessor = require('./FeedProcessor.js');

module.exports = function(ctx) {

    var rtorrent = ctx.rtorrent || new Rtorrent(ctx.config.rTorrent);

    schedule.scheduleJob(ctx.config.rTorrent.checkFeedInterval, () => {

        var rssFeeds = ctx.storage.getItemSync('feeds');
        if (!rssFeeds) {
            rssFeeds = ctx.config.rTorrent.feeds;
            ctx.storage.setItemSync('feeds', rssFeeds);
        }
        for (let feed of rssFeeds) {

            var feedProcessor = new FeedProcessor({
                feedUrl: feed.url,
                itemHandler: (item) => {
                    var feeds = ctx.storage.getItemSync('downloaded') || {};
                    var feedItem = feeds[item.title] || {};
                    if (feedItem.link) return;
                    feedItem = item;
                    feeds[item.title] = feedItem;
                    ctx.storage.setItemSync('downloaded', feeds);
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