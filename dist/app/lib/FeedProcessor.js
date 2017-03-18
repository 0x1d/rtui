var FeedParser = require('feedparser')
  , request = require('request');

module.exports = FeedProcessor = function(options){

  var req = request(options.feedUrl)
    , feedparser = new FeedParser({});

  req.on('error', options.requestErrorHandler ||function (){});
  req.on('response', function (res) {
    var stream = this;
    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
    stream.pipe(feedparser);
  });


  feedparser.on('error', options.parsingErrorHandler || function(){});
  feedparser.on('readable', function() {

    var stream = this
      , meta = this.meta
      , item;

    while (item = stream.read()) {
      options.itemHandler(item);
    }
  });
  
};

