module.exports = {
    mode: 'xmlrpc',
    host: '192.168.1.121',
    port: 80,
    path: '/RPC2',
    user: 'user',
    pass: 'password',
    checkFeedInterval: '*/10 * * * * *',
    feeds: [{
            key: 'showrss',
            url: 'http://showrss.info/user/76295.rss?magnets=true&namespaces=true&name=null&quality=null&re=null'
        }

    ]
};